import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

const ResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Digite seu email!")
    .email("Digite um email válido!"),
});

type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(ResetPasswordSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      await resetPassword(data.email);
      toast.success("Email de recuperação enviado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        className: "rounded shadow-lg text-white bg-secondary text-sm",
      });
      navigate("/login");
    } catch (err) {
      console.error("Reset Password failed", err);
      toast.error(
        "Falha ao enviar o email de recuperação. Verifique suas informações e tente novamente.",
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
  };

  return (
    <>
      <div className="min-h-screen w-ful px-7 container mx-auto md:w-3/4 lg:w-2/4 lg:flex lg:justify-between lg:items-center">
        <div className="flex flex-col justify-between items-start py-20">
          <div className="w-full flex justify-between items-start">
            <h1 className="text-white text-5xl md:text-6xl font-inter font-bold">
              Recuperar Senha
            </h1>
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

            <div className="w-full gap-4 py-6 flex flex-col items-center justify-between">
              <Button
                text="Enviar email de recuperação"
                type="submit"
                isSubmitting={isSubmitting}
              />

              <span className="font-bold text-xs text-white">
                Lembrou sua senha?{" "}
                <a href="/login" className="underline">
                  Faça login!
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
