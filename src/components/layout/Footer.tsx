export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background-secondary/30 mt-20">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-text-muted text-sm">
            © 2024 Rate My Class. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-text-secondary">
            <a href="#" className="hover:text-accent-blue transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-accent-blue transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-accent-blue transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
