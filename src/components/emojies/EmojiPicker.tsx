'use client';

import { useState } from 'react';
import { Picker } from 'emoji-picker-react'; // Importamos el picker de emojis

interface EmojiPickerProps {
    onEmojiSelect: (emoji: string) => void; // Función para pasar el emoji al componente principal
}

const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => {
    const [showPicker, setShowPicker] = useState(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEmojiClick = (emoji: any) => {
        onEmojiSelect(emoji.emoji); // Llamar a la función con el emoji seleccionado
        setShowPicker(false); // Cerrar el picker al seleccionar un emoji
    };

    return (
        <div className="relative">
            <button
                type="button"
                className="p-2 text-xl"
                onClick={() => setShowPicker(!showPicker)} // Abrir/cerrar el picker
            >
                😊
            </button>

            {/* Mostrar el picker de emojis si showPicker es true */}
            {showPicker && (
                <div className="absolute bottom-14 left-0 z-10">
                    <Picker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
};

export default EmojiPicker;
