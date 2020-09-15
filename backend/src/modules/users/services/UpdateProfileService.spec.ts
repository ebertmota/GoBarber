import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Thre',
      email: 'johnthre@example.com',
    });

    expect(updatedUser.name).toBe('John Thre');
    expect(updatedUser.email).toBe('johnthre@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Mariah Doe',
      email: 'mariagh@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Thre',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Thre',
      email: 'johnthre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Thre',
        email: 'johnthre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong oldPassword', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Thre',
        old_password: 'wrong-old-password',
        email: 'johnthre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'Non-existing',
        email: 'nonExisting@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
