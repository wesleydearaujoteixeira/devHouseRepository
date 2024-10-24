'use client';

import styles from './home.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser } from '../../services/servicesApi';
import Link from 'next/link';



// Schema Zod para validação do formulário
const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await createUser(data);
      console.log('User registered successfully:', response.data);

    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} method='post' className={styles.form}>
        <label htmlFor="username" className={styles.label}>Username</label>
        <input 
          type="text" 
          id="username" 
          placeholder="Username"
          {...register('username')} 
          className={styles.input} 
        />
        {errors.username && <p className={styles.error}>{errors.username.message}</p>}

        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="example@example.com"
          {...register('email')} 
          className={styles.input} 
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label htmlFor="password" className={styles.label}>Password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="Password"
          {...register('password')} 
          className={styles.input} 
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        <button className={styles.btn} type="submit">Cadastrar</button>
        <p> Já tem uma conta? <Link href="/login-account" className={styles.info} > Sign In </Link> </p>

      </form>
    </div>
  );
};

export default Register;
