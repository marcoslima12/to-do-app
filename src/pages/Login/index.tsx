import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../services/auth";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Logo } from "../../assets/Logo";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Digite seu email!")
    .email("Digite um email válido!"),
  password: z.string().min(1, "Digite sua senha!"),
});

type LoginFormInput = z.infer<typeof LoginFormSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({ resolver: zodResolver(LoginFormSchema) });
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const onSubmit = async (data: LoginFormInput) => {
    try {
      await logIn(data.email, data.password);
      navigate("/home");
    } catch (err) {
      console.error("Login failed", err);
      toast.error(
        "Falha no login. Verifique suas credenciais e tente novamente.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: false,
          className: "rounded shadow-lg text-white bg-secondary text-sm", // Adiciona sombra e bordas arredondadas
        }
      );
    }
    reset();
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <div className="min-h-screen w-ful px-7 container mx-auto md:w-3/4 lg:w-2/4 lg:flex lg:justify-between lg:items-center">
        <div className="flex flex-col justify-between items-start py-20">
          <div className="w-full flex justify-between items-start">
            <h1 className="text-white text-5xl md:text-6xl font-inter font-bold">
              do it!
            </h1>
            <div className="flex lg:hidden">
              <Logo />
            </div>
          </div>

          <form
            className="w-full flex flex-col justify-evenly items-center mt-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full">
              <label
                className=" text-white text-lg font-bold lg:text-xl "
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`box-border w-full px-3  py-2 mt-4 mb-2 text-sm bg-primary text-white rounded shadow focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }  `}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic mb-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                className=" text-white text-lg lg:text-xl font-bold"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`w-full px-3 py-2 mt-4 mb-2 text-sm bg-primary text-white rounded shadow focus:outline-none focus:shadow-outline ${
                  errors.password ? "border-red-500 mb-2" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="w-full gap-4 py-6 flex flex-col items-center justify-between">
              <button
                disabled={isSubmitting}
                type="submit"
                className={`w-full gradient-highlight text-terciary text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Continuar"
                )}
              </button>
              <span className="font-bold text-xs text-white">
                Não tem uma conta?{" "}
                <a href="/signup" className="underline">
                  Cadastre-se!
                </a>
              </span>

              {/* <a href="/signup" className="underline font-bold text-xs text-white">
            Esqueci minha senha
          </a> */}
            </div>
          </form>
        </div>

        <div className="bg-terciary hidden lg:flex">
          <Logo />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
