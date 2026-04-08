interface LoadingSpinnerProps {
  cssClasses?: string
  isLoading: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  cssClasses
}) => {
  return (
    <>
      {isLoading && (
        <div
          className={`animate-loading-spinner mx-auto box-border rounded-full border-[5px] border-solid border-transparent ${cssClasses}`}
        />
      )}
    </>
  )
}

export default LoadingSpinner
