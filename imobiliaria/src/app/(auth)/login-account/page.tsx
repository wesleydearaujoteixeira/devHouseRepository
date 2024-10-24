'use client'

import styles from '../../(register)/register-account/home.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUser } from '../../services/servicesApi';
import Link from 'next/link';


// Schema Zod para validação do formulário
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await LoginUser(data);
      console.log('User registered successfully:', response.data);

    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} method='post' className={styles.form}>
       

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

        <button className={styles.btn} type="submit"> Logar </button>

        <p> Não tem uma conta? <Link href="/register-account" className={styles.info} > Registre-se </Link> </p>
      </form>
    </div>
  );
};

export default Login;
