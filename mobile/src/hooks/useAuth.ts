import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/api';
import { setCredentials, setUser, logout, setLoading, setError } from '../store/authSlice';
import { selectAuth } from '../store/authSlice';
import type { AppDispatch } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await authService.login(email, password);

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );

      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.error || 'Erro ao fazer login';
      dispatch(setError(message));
      return { success: false, error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register = async (data: {
    name: string;
    username: string;
    email: string;
    cpf: string;
    phone?: string;
    password: string;
    congregation?: string;
    role?: string;
    baptism_date?: string;
    city?: string;
    state?: string;
  }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await authService.register(data);

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );

      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.error || 'Erro ao criar conta';
      dispatch(setError(message));
      return { success: false, error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      dispatch(logout());
    }
  };

  const loadProfile = async () => {
    try {
      dispatch(setLoading(true));
      const user = await authService.getProfile();
      dispatch(setUser(user));
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.error || 'Erro ao carregar perfil';
      dispatch(setError(message));
      return { success: false, error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateProfile = async (id: number, data: any) => {
    try {
      dispatch(setLoading(true));
      const response = await authService.updateProfile(id, data);
      dispatch(setUser(response.user));
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.error || 'Erro ao atualizar perfil';
      dispatch(setError(message));
      return { success: false, error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...auth,
    login,
    register,
    logout: logoutUser,
    loadProfile,
    updateProfile,
  };
};
