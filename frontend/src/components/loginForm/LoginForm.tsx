import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [flashMessages, setFlashMessages] = useState<string[]>([]);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookies.get('user_role')
    const id = Cookies.get('user_id');
    if (id) {
      setUserId(id);
    }
    if (role) {
      setUserRole(role);
    }

  }, []);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          login,
          psw: password,
          remainme: rememberMe ? 'true' : '',
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setFlashMessages([data.message]);
  
        Cookies.set('user_id', data.user.id);
        Cookies.set('user_role', data.user.role);
  
        setUserId(data.user.id);
        setUserRole(data.user.role);
  
        if (data.debug && data.debug.cookies) {
          setDebugInfo(JSON.stringify(data.debug.cookies, null, 2));
        }
  
        // Проверка роли и перенаправление
        if (data.user.role === 'admin') {
          navigate('/adminpage');
        } else {
          navigate('/profile');
        }
      } else {
        const errorData = await response.json();
        setFlashMessages([errorData.error || 'Ошибка входа']);
      }
    } catch (error) {
      setFlashMessages(['Ошибка соединения с сервером. Попробуйте позже.']);
    }
  };

  return (
    <div className="container" id="container">
      {flashMessages.map((msg, index) => (
        <div key={index} style={{ color: 'white' }}>
          {msg}
        </div>
      ))}

      <div className="form-container sign-in">
        <form onSubmit={handleSubmit} className="form-contact">
          <h1>Вход</h1>
          <br />
          <span>используй свой логин и пароль</span>
          <input
            type="text"
            placeholder="Логин"
            name="login"
            value={login}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            name="psw"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <p>
            <input type="submit" value="Войти" />
          </p>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>Рады видеть тебя снова</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
