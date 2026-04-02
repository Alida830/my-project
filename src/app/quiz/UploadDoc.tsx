"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const UploadDoc = () => {
    const [document, setDocument] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!document) {
            setError("Please upload a document first.");
            return;
        }

        setIsLoading(true);
        setError("");
        
        const formData = new FormData();
        formData.append("pdf", document);

        try {
            const res = await fetch("/api/quizz/generate", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/quiz/${data.quizzId}`);
            } else {
                const errData = await res.json();
                setError(errData.error || "Failed to generate quiz");
                setIsLoading(false);
            }
        } catch (err: any) {
            console.error("Error while generating:", err);
            setError("A network error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-12 gap-6"
                            >
                                <div className="relative w-20 h-20">
                                    <motion.div 
                                        className="absolute inset-0 border-4 border-blue-500/20 rounded-full"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    />
                                    <Loader2 className="w-20 h-20 text-blue-600 animate-spin" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Analyzing Document...</h3>
                                    <p className="text-slate-500 dark:text-slate-400">Our AI is extracting key concepts and generating questions.</p>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-blue-600"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "95%" }}
                                        transition={{ duration: 5, ease: "easeOut" }}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.form 
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit} 
                                className="space-y-6"
                            >
                                <label 
                                    htmlFor="document" 
                                    className={cn(
                                        "group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer",
                                        document 
                                            ? "border-green-500 bg-green-50/50 dark:bg-green-900/10" 
                                            : "border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                                    )}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                        {document ? (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full inline-block">
                                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-semibold text-slate-900 dark:text-white truncate max-w-xs">{document.name}</p>
                                                    <p className="text-sm text-slate-500">{(document.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <Upload className="w-10 h-10 text-blue-600" />
                                                </div>
                                                <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Click or drag to upload</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">PDF or TXT (Max 10MB)</p>
                                            </>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        id="document"
                                        accept=".pdf,.txt"
                                        className="hidden" 
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setDocument(file);
                                                setError("");
                                            }
                                        }}
                                    />
                                </label>

                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 p-4 text-sm text-red-800 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                                    >
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}

                                <Button 
                                    size="lg" 
                                    className="w-full h-14 text-lg font-bold transition-all duration-300 transform active:scale-95"
                                    type="submit"
                                    disabled={!document || isLoading}
                                >
                                    <FileText className="mr-2 h-5 w-5" />
                                    Generate Quiz
                                </Button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
            
            <p className="text-center mt-6 text-slate-500 dark:text-slate-400 text-sm">
                Powered by AI • No data is stored without your permission
            </p>
        </div>
    );
};

export default UploadDoc;
