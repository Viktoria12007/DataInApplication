import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import {FC} from "react";
import {useMutation} from "@tanstack/react-query";
import {registerUser} from "../../api/User";
import {queryClient} from "../../api/queryClient";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const RegisterFormSchema = z.object({
    username: z.string().min(5, 'Имя пользователя должно содержать не менее пяти символов'),
    email: z.string().email('Email должен содержать корректный формат электронной почты'),
    password: z.string().min(8, 'Пароль должен содержать не менее восьми символов'),
});
type RegisterForm = z.infer<typeof RegisterFormSchema>;

export const RegisterForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterForm>({
        resolver: zodResolver(RegisterFormSchema),
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
    }, queryClient);

  return (
    <form className="register-form" onSubmit={handleSubmit((user) => {
        registerMutation.mutate(user);
        reset();
    })}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input {...register("username")} />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>
      {registerMutation.error && <span>{registerMutation.error.message}</span>}
      <Button type="submit" isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
