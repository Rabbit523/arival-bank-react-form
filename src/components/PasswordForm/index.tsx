import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { FormProps } from "../../types";

export const PasswordForm = ({ onComplete }: FormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm();

  // Get the value of the password for comparison
  const password = watch("password", "");

  const onSubmit = (data: any) => {
    onComplete(data);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="text-secondary-color pb-4">Super test form</h2>
      <p className="text-first-color">Password screen</p>
      <form className="bg-first-color form gap-10 p-5 md:p-10 rounded-2xl w-full md:w-96 mt-14 md:mt-0 max-w-custom" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-white">Password</label>
          <input
            type="password"
            id="password"
            className="placeholder-primary focus:outline-0"
            {...register("password", { required: true, minLength: 8 })}
            placeholder="Input password"
          />
          {errors.password && <MdError className="absolute text-error top-[36px] right-[12px]" size={16} />}
          {errors.password && (
            <p className="text-error error">
              This field is required and should be at least 8 characters.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="repeatPassword" className="text-white">Email</label>
          <input
            type="password"
            id="repeatPassword"
            className="placeholder-primary focus:outline-0"
            placeholder="Repeat password"
            {...register("repeatPassword", {
              required: true,
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
          />
          {errors.repeatPassword?.message && <MdError className="absolute text-error top-[36px] right-[12px]" size={16} />}
          {errors.repeatPassword?.message && (
            <p className="text-error error">
              {errors.repeatPassword.message as string}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={
            !isValid
              ? "bg-btn-disabled text-btn-txt-second"
              : "bg-white text-secondary-color"
          }
        >
          Continue
        </button>
      </form>
    </div>
  );
};
