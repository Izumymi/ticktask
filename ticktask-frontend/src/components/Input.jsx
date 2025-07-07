const Input = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        {...props}
      />
    </div>
  );
};

export default Input;
