import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { signUp } from "../../services/auth";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { MobileLogo } from "../../components/MobileLogo";
import { DesktopLogo } from "../../components/DesktopLogo";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

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
          "A senha deve conter uma letra maiúscula, minúscula, um número e um caractere especial!",
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

  const handleAddUser = async (email: string, fullname: string) => {
    try {
      await api.post("/users", {
        email,
        fullname,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      const userCredential = await signUp(data.email, data.password);

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: `${data.firstName} ${data.lastName}`,
        });
        if(userCredential.user.displayName && userCredential.user.email){
          handleAddUser(
            userCredential.user.email,
            userCredential.user.displayName
          );
        }
        await sendEmailVerification(userCredential.user);
        navigate("/verify-email");
      }
    } catch (err) {
      console.error("Sign Up failed", err);
      toast.error(
        "Falha no cadastro. Verifique suas informações e tente novamente.",
        {
          position: "bottom-right",
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
      <div className="min-h-screen w-full px-7 container mx-auto md:w-3/4 lg:w-3/5 lg:flex lg:justify-between lg:items-center lg:gap-10">
        <div className="flex flex-col justify-between items-start py-20 w-full lg:w-auto">
          <div className="w-full flex justify-between items-start">
            <h1 className="text-white text-5xl md:text-6xl font-inter font-bold">
              do it!
            </h1>
            <DesktopLogo />
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
              placeholder="Nome"
              required
            />

            <Input
              id="lastName"
              label="Sobrenome"
              type="text"
              error={errors.lastName}
              register={register("lastName")}
              placeholder="Sobrenome"
              required
            />

            <Input
              id="email"
              label="Email"
              type="email"
              error={errors.email}
              register={register("email")}
              placeholder="Email"
              required
            />

            <Input
              id="password"
              label="Senha"
              type="password"
              error={errors.password}
              register={register("password")}
              placeholder="Senha"
              required
            />

            <Input
              id="confirmPassword"
              label="Confirmar senha"
              type="password"
              error={errors.confirmPassword}
              register={register("confirmPassword")}
              placeholder="Confirmar senha"
              required
            />

            <div className="w-full gap-4 py-6 flex flex-col items-center justify-between text-center">
              <Button
                text="Cadastrar-se"
                type="submit"
                isSubmitting={isSubmitting}
              />
              <span className="font-bold text-xs text-white text-center">
                Já tem uma conta?{" "}
                <a href="/login" className="underline">
                  Faça login
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
