//error component with tailwind

export const InputError=({ error })=> {
  if (!error) return null;
  return (
    <p className="text-red-500 text-xs mt-1">
      {error}
    </p>
  );
}