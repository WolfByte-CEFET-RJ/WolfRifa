import React from 'react';
import { CalendarDays, Users, Copy, Upload, X, HandCoins } from 'lucide-react';

interface ModalPagamentoVaquinhaProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const ModalPagamentoVaquinha: React.FC<ModalPagamentoVaquinhaProps> = ({
    isOpen = true,
    onClose = () => { }
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]">
            <div className="bg-white rounded-lg w-full max-w-[850px] flex flex-col md:flex-row overflow-hidden shadow-2xl relative border-2 border-brand-primary">

                {/* Botão de Fechar Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-200 md:hidden z-20 bg-black/20 rounded-full p-1"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Coluna Esquerda - Info Vaquinha (Fundo Azul) */}
                <div className="w-full md:w-[45%] bg-brand-primary text-white p-6 sm:p-8 flex flex-col relative z-10">

                    {/* Imagem */}
                    <div className="relative rounded-xl overflow-hidden mb-8 shadow-md border border-white/10 aspect-[4/3] sm:aspect-auto sm:h-52 shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Equipamentos para nosso laboratório"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-brand-primary/90 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold backdrop-blur-sm">
                            <HandCoins className="w-3.5 h-3.5" />
                            Vaquinha
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-4 tracking-tight leading-snug">Equipamentos para nosso laboratório</h2>
                    <hr className="border-white/20 mb-6" />

                    {/* Descrição */}
                    <p className="text-white/80 text-sm leading-relaxed mb-8">
                        Lorem Ipsum is not simply random text. It has roots.Lorem Ipsum is not simply random text. It has roots.Lorem Ipsum is not simply random text. It has roots.
                    </p>

                    {/* Info Grid */}
                    <div className="flex flex-col gap-6 flex-1">
                        <div className="flex items-center gap-4">
                            <CalendarDays className="w-5 h-5 text-white/80 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-wider text-white/70 font-medium">Criada em</span>
                                <span className="text-sm font-semibold">21/12/2026</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Users className="w-5 h-5 text-white/80 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-wider text-white/70 font-medium">Organizado por</span>
                                <span className="text-sm font-semibold">WolfBotz</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coluna Direita - Pagamento (Fundo Branco) */}
                <div className="w-full md:w-[55%] p-6 sm:p-10 flex flex-col relative bg-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hidden md:flex items-center justify-center p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Título PIX */}
                    <div className="flex items-center gap-3 mb-6 mt-2">
                        <h3 className="text-xl font-bold text-brand-primary tracking-tight">Pagamento via PIX</h3>
                    </div>

                    <hr className="border-gray-100 mb-8" />

                    {/* QR Code Section */}
                    <div className="flex items-center justify-center sm:justify-start gap-6 mb-8 px-2">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white border border-gray-200 p-2 rounded-xl flex-shrink-0 shadow-sm flex items-center justify-center">
                            <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-cover bg-center opacity-80 rounded-md"></div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <p className="text-brand-primary font-bold text-sm sm:text-base leading-snug">
                                Escaneie o QR code<br />pelo seu banco
                            </p>
                        </div>
                    </div>

                    {/* Divider "ou" */}
                    <div className="relative flex items-center mb-8">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-brand-primary/60 text-xs font-medium uppercase tracking-widest">ou</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Chave Pix Copia e Cola */}
                    <div className="mb-8 flex flex-col items-center w-full">
                        <span className="text-brand-primary/80 text-xs font-medium mb-2">Chave PIX</span>
                        <div className="w-full relative">
                            <input
                                type="text"
                                readOnly
                                value="654984984848.651.894.891.564894.BB.Gov.8hayyYYdua.BCentral"
                                className="w-full pl-4 pr-12 py-3 bg-white border border-brand-primary/30 rounded-lg text-xs font-medium text-gray-700 outline-none truncate"
                            />
                            <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors cursor-pointer">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Spacer to push button down se a esquerda for muito maior */}
                    <div className="flex-1"></div>

                    {/* Warning Box */}
                    <div className="bg-[#FCF9EE] border border-[#F2E5B5] rounded-lg p-4 text-center mb-6">
                        <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed font-medium">
                            Após o pagamento, envie o comprovante para confirmarmos sua contribuição.
                        </p>
                    </div>

                    {/* Botão Enviar Comprovante */}
                    <button className="w-full bg-[#2067A1] text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1a5585] transition-colors font-semibold shadow-sm cursor-pointer">
                        <Upload className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
