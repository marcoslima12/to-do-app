import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../services/auth";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { DesktopLogo } from "../../components/DesktopLogo";
import { MobileLogo } from "../../components/MobileLogo";
import useAuth from "../../hooks/useAuth";

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
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: false,
          className: "rounded shadow-lg text-white bg-primary text-sm", 
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
      <div className="min-h-screen w-full px-7 container mx-auto md:w-3/4 lg:w-3/5 lg:flex lg:justify-between lg:items-center lg:gap-10">
        <div className="flex flex-col justify-between items-start py-20 w-full lg:w-auto">
          <div className="w-full flex justify-between items-start">
            <h1 className="text-white text-5xl md:text-6xl font-inter font-bold">
              do it!
            </h1>
            <DesktopLogo />
          </div>

          <form
            className="w-full flex flex-col justify-evenly items-center mt-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              id="email"
              label="Email"
              type="email"
              error={errors.email}
              register={register("email")}
              placeholder="Email"
            />

            <Input
              id="password"
              label="Senha"
              type="password"
              error={errors.password}
              register={register("password")}
              placeholder="Senha"
            />

            <div className="w-full gap-4 py-6 flex flex-col items-center justify-between">
              <Button
                text="Continuar"
                type="submit"
                isSubmitting={isSubmitting}
              />

              <span className="font-bold text-xs text-white text-center">
                Esqueceu sua senha?{" "}
                <a href="/reset-password" className="underline">
                  Recuperar senha
                </a>
              </span>
              <span className="font-bold text-xs text-white text-center">
                Não tem uma conta?{" "}
                <a href="/signup" className="underline">
                  Cadastre-se!
                </a>
              </span>
            </div>
          </form>
        </div>

        <MobileLogo />
      </div>

      <ToastContainer />
    </>
  );
};
