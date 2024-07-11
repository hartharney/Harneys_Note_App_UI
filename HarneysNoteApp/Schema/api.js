
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, LOGIN_USER, REGISTER_USER, saveToken } from './graphqlQueries';

export const useGetUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  return { loading, error, data };
};
export const useRegisterUser = () => {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleRegisterUser = async (input) => {
    try {
      const result = await registerUser({ variables: { input } });
      return result.data.registerUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  return { handleRegisterUser, data, loading, error };
};

export const useLoginUser = () => {
    const [login, { data, loading, error }] = useMutation(LOGIN_USER);
    
    const handleLoginUser = async ({email, password}) => {
        try {
        const result = await login({ variables: { email, password } });
        const token = result.data.login.token;
        await saveToken(token);
        return result.data.login.user;
        } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
        }
    };
    
    return { handleLoginUser, data, loading, error };
    }