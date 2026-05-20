import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import logo from "@/assets/logo.png";
import bgImage from "@/assets/Portfólio Devign.png"; 

const Index = () => {
  return (
    <Layout>
      <section className="relative min-h-screen bg-[#020205] w-full flex items-center justify-center bg-[#0a0a1a] overflow-hidden">
      {/* --- CAMADAS DE BACKGROUND --- */}
        {/* 1. Imagem de Fundo Assets */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="Background Texture" 
            className="w-full h-full object-cover opacity-60 mix-blend-screen" 
          />
          {/* Overlay de gradiente para suavizar a imagem com o fundo preto */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-transparent to-[#020205]" />
        </div>
        {/* 1. Retícula Global (Pontos pequenos em todo o fundo) */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
        {/* 2. Efeito Halftone (Nuvens de pontos nas laterais conforme image_f4583c.png) */}
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)`,
            backgroundSize: '14px 14px',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 40%, transparent 60%, black 100%)',
            maskImage: 'linear-gradient(to right, black 0%, transparent 40%, transparent 60%, black 100%)'
          }}
        />
        {/* 3. Brilho Azulado Central (Glow de profundidade) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[70vh] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* 4. Linhas verticais (Estilo blueprint) */}
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-5 pointer-events-none z-0">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
          ))}
        </div>

          {/* Bloco Central de Título - Adicionei mt-[-5vw] para subir o bloco todo */}
          <div className="relative isolate flex flex-col items-center justify-center mt-[3vw]">
            {/* DEVIGN - Ajustado para subir na hierarquia visual */}
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-dexurita text-[28vw] mt-[-7vw] left-[-2vw] top-[-6vw] leading-[0.8] text-white tracking-tighter glow-devign text-glow-blue relative z-10"
            >
              devign
            </motion.h1>

            <div className="absolute left-[0vw] top-[3vw] z-50">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.8 }}
                style={{
                /* Camada 1: Sombra preta intensa para contraste | Camada 2: Brilho branco suave */
                filter: `
                  drop-shadow(0 10px 20px rgba(0,0,0,1)) 
                  drop-shadow(0 -5px 10px rgba(0,0,0,1)) 
                  drop-shadow(0 0px 25px rgb(16, 9, 48)) 
                  drop-shadow(0 -5px 25px rgba(0,0,0,0.2)) 
                  drop-shadow(0 0 10px rgba(11, 4, 71, 0.2))
                `,
                zIndex: 50}}
                className="font-denova italic text-[3.5vw] text-white drop-shadow-[0px -15px -8px rgba(18, 5, 47, 1)] text-glow-blue relative z-20"
              >
                Studio
              </motion.span>
              </div>

              {/* Logo Central - Mantida em destaque à frente */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-[6vw] z-30"
              >
                <img 
                  src={logo} 
                  alt="Devign Icon" 
                  className="w-[23vw] h-auto brightness-125 shadow-blue-logo" 
                />
              </motion.div>
            </div>

          {/* Ano no canto inferior direito */}
          <div className="absolute bottom-10 right-10">
            <span className="font-sans text-xs tracking-widest text-white/90">2026</span>
          </div>
        {/* Glow Burgundy Sutil no Fundo */}
        <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[#800020]/10 blur-[120px] rounded-full pointer-events-none" />
      </section>
    </Layout>
  );
};

export default Index;