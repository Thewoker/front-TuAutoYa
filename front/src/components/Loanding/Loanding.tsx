const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <img
                src="https://i.pinimg.com/originals/15/e3/2c/15e32ccaf19324a19f6f32f2280ed771.gif"
                alt="Cargando..."
                className="h-20 w-20"
            />
            <p className="ml-4 text-xl text-gray-700">Cargando...</p>
        </div>
    );
};

export default Loading;
