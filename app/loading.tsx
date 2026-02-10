export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-charcoal flex items-center justify-center">
      <div className="relative">
        <span
          className="text-display font-serif text-offwhite/90 load-reveal"
          style={{ animationDuration: '1.2s' }}
        >
          TL
        </span>
        <div
          className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-amber to-transparent load-reveal"
          style={{ animationDelay: '0.6s', animationDuration: '0.8s' }}
        />
      </div>
    </div>
  );
}
