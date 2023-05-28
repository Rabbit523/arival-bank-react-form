import { User } from "../../types";

interface ReviewFormProps {
  user?: User;
  onReset: () => void;
}

export const ReviewForm = ({ user, onReset }: ReviewFormProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="text-secondary-color pb-4">Super test form</h2>
      <p className="text-first-color">Review screen</p>
      <div className="bg-first-color form gap-10 p-5 md:p-10 rounded-2xl w-full md:w-96 mt-14 md:mt-0 max-w-custom">
        <div className="flex justify-between">
          <label className="text-label">Username</label>
          <p className="error text-white">{user?.username}</p>
        </div>
        <div className="flex justify-between">
          <label className="text-label">Email</label>
          <p className="error text-white">{user?.email}</p>
        </div>
        <div className="flex justify-between">
          <label className="text-label">Country</label>
          <p className="error text-white">{user?.country}</p>
        </div>
        <button className="bg-white text-secondary-color" onClick={onReset}>
          Complete
        </button>
      </div>
    </div>
  );
};
