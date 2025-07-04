import { LogIn } from 'lucide-react';

const LoginButton = () => (
  <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
    <LogIn className="mr-2" />
    Login
  </button>
);

export default LoginButton;
