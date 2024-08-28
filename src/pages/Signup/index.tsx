import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { signUp } from "../../services/auth";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Logo } from "../../components/Logo";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input"; // Importa o componente Input

const SignUpFormSchema = z
  .object({
    firstName: z.string().min(1, "Digite seu primeiro nome!"),
    lastName: z.string().min(1, "Digite seu sobrenome!"),
    email: z.string().email("Digite um email válido!"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres!")
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial!",
      }),
    confirmPassword: z.string().min(1, "Confirme sua senha!"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas devem ser iguais!",
    path: ["confirmPassword"],
  });

type SignUpFormInputs = z.infer<typeof SignUpFormSchema>;

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpFormSchema),
  });
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      const userCredential = await signUp(data.email, data.password);

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: `${data.firstName} ${data.lastName}`,
        });
      }

      navigate("/home");
    } catch (err) {
      console.error("Sign Up failed", err);
      toast.error(
        "Falha no cadastro. Verifique suas informações e tente novamente.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: false,
          className: "rounded shadow-lg text-white bg-secondary text-sm",
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
      <div className="min-h-screen w-full px-7 container mx-auto md:w-3/4 lg:w-2/4 lg:flex lg:justify-between lg:items-center">
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
            className="w-full flex-col justify-evenly items-center mt-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              id="firstName"
              label="Nome"
              type="text"
              error={errors.firstName}
              register={register("firstName")}
            />

            <Input
              id="lastName"
              label="Sobrenome"
              type="text"
              error={errors.lastName}
              register={register("lastName")}
            />

            <Input
              id="email"
              label="Email"
              type="email"
              error={errors.email}
              register={register("email")}
            />

            <Input
              id="password"
              label="Senha"
              type="password"
              error={errors.password}
              register={register("password")}
            />

            <Input
              id="confirmPassword"
              label="Confirmar Senha"
              type="password"
              error={errors.confirmPassword}
              register={register("confirmPassword")}
            />

            <div className="w-full gap-4 py-6 flex flex-col items-center justify-between">
              <Button text="Cadastrar-se" type="submit" isSubmitting={isSubmitting} /> 
              <span className="font-bold text-xs text-white">
                Já tem uma conta?{" "}
                <a href="/login" className="underline">
                  Faça login
                </a>
              </span>
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
