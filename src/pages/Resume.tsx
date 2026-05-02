import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, AlertCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const resumePdfPath = "/images/vishantbhardwaj.pdf";

export default function Resume() {
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen text-foreground">
      {/* Header with navigation */}
      <div className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs font-black uppercase tracking-[0.24em] text-primary">Resume</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-subtext">Professional Profile</span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="rounded-xl border border-border bg-surface/80 text-subtext hover:bg-surface hover:text-text">
                <a href={resumePdfPath} download="Vishant_Bhardwaj_Resume.pdf">
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="rounded-xl border border-border/70 bg-surface/80 text-subtext hover:bg-surface hover:text-text">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-6xl h-full max-h-[calc(100vh-10rem)] bg-surface/95 rounded-2xl shadow-2xl overflow-hidden border border-border/50 flex flex-col backdrop-blur-xl"
        >
          {/* PDF Content */}
          <div className="flex-1 overflow-auto p-4">
            {error && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <AlertCircle className="h-16 w-16 text-destructive mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Error Loading Resume</h2>
                <p className="text-subtext mb-6 max-w-md">{error}</p>
                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <a href={resumePdfPath} download="Vishant_Bhardwaj_Resume.pdf">
                      <Download className="h-4 w-4 mr-2" />
                      Download Instead
                    </a>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link to="/">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {!error && (
              <div className="flex justify-center">
                <iframe
                  src={`${resumePdfPath}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                  className="w-full h-[600px] border-0 rounded-lg shadow-lg"
                  title="Vishant Bhardwaj Resume"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
