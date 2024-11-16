'use client'

import { useState, useCallback } from 'react';
import Image from 'next/image';

export default function DeepfakeDetector() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      
      const imageBuffer = await selectedImage.arrayBuffer();

      const response = await fetch('https://api-inference.huggingface.co/models/Wvolf/ViT_Deepfake_Detection', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
        body: new Uint8Array(imageBuffer),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(response.status === 503 
          ? 'Model is loading. Please try again in a few seconds.'
          : `API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Complete API Response:', data);
      setResult(data); 

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setLoading(false);
    }
  }, [selectedImage]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/95 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-[#D5FE52]/30">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#D5FE52]">Deepfake Detection</h2>
            <p className="text-gray-300 mt-2">
              Upload an image to check if it's real or artificially generated.
            </p>
          </div>

          <div className="space-y-6">
            <div 
              className="border-2 border-dashed border-[#D5FE52]/30 rounded-lg p-8 hover:border-[#D5FE52] transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <label className="flex flex-col items-center cursor-pointer">
                <div className="text-center">
                  <p className="text-gray-300">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>

            {preview && (
              <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-900/50 text-red-200 rounded-lg border border-red-500/50">
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!selectedImage || loading}
              className={`
                w-full py-3 px-4 rounded-lg font-medium transition-all duration-300  transform
                ${loading || !selectedImage 
                  ? 'bg-[#D5FE52]/50 text-black cursor-not-allowed'
                  : 'bg-[#D5FE52] text-black  hover:bg-[#D5FE52]/90 '}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </div>
              ) : (
                'Detect the image'
              )}
            </button>

            {result && (
              <div className="mt-6 p-6 bg-black/50 rounded-lg border border-[#D5FE52]/30">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#D5FE52]">Analysis Results</h3>
                  
                  <div className="bg-black/90 p-4 rounded border border-[#D5FE52]/20">
                    <div className="overflow-x-auto">
                      <pre className="text-sm whitespace-pre-wrap break-words text-white ">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
