import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { Lock, AlertCircle, Mail } from 'lucide-react';
import styled from 'styled-components';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="form_main" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="heading">Welcome back</h1>
        
        {error && (
          <div className="error-container">
            <AlertCircle className="error-icon" />
            <p className="error-text">{error}</p>
          </div>
        )}

        <div className="inputContainer">
          <Mail className="inputIcon" />
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            placeholder="Email address"
            className="inputField"
            type="email"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="inputContainer">
          <Lock className="inputIcon" />
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            placeholder="Password"
            className="inputField"
            type="password"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <div className="options">
          <label className="remember">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#" className="forgot">Forgot password?</a>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="bottom-text">
          <p>Don't have an account?{' '}
            <Link to="/register">Create one</Link>
          </p>
        </div>

        <div className="demo">
          <div className="divider">Demo Accounts</div>
          <div className="credentials">
            <p><strong>Admin:</strong> admin@example.com / admin123</p>
            <p><strong>Employee:</strong> aman@example.com / employee123</p>
          </div>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-color: #f3f4f6;
  padding: 1rem;

  .form_main {
    width: min(100%, 360px);
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .heading {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .error-container {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #fef2f2;
    border-radius: 6px;
    margin-bottom: 1rem;

    .error-icon {
      color: #dc2626;
      width: 1rem;
      height: 1rem;
    }

    .error-text {
      color: #dc2626;
      font-size: 0.875rem;
    }
  }

  .inputContainer {
    position: relative;
    margin-bottom: 1rem;

    .inputIcon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      width: 1.25rem;
      height: 1.25rem;
    }

    .inputField {
      width: 100%;
      padding: 0.75rem 0.75rem 0.75rem 2.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: border-color 0.15s ease;

      &:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
      }

      &::placeholder {
        color: #9ca3af;
      }
    }

    .error-message {
      color: #dc2626;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
  }

  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.875rem;

    .remember {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #4b5563;

      input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        border-radius: 4px;
        accent-color: #4f46e5;
      }
    }

    .forgot {
      color: #4f46e5;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .submit-button {
    width: 100%;
    padding: 0.75rem;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: #4338ca;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .bottom-text {
    margin: 1.5rem 0;
    text-align: center;
    font-size: 0.875rem;
    color: #4b5563;

    a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .demo {
    .divider {
      position: relative;
      text-align: center;
      font-size: 0.875rem;
      color: #6b7280;
      margin: 1rem 0;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: #e5e7eb;
        z-index: -1;
      }

      &::after {
        content: attr(data-content);
        background: white;
        padding: 0 0.5rem;
      }
    }

    .credentials {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 0.75rem;
      font-size: 0.75rem;

      p {
        color: #4b5563;
        margin: 0.25rem 0;

        strong {
          color: #374151;
        }
      }
    }
  }

  @media (max-width: 640px) {
    padding: 1rem;

    .form_main {
      padding: 1.5rem;
    }

    .heading {
      font-size: 1.25rem;
    }

    .options {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
  }
`;

export default Login;