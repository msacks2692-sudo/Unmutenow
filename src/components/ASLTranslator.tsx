import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, CameraOff, Play, Pause, Volume2, Settings, Hand, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-backend-webgl';

interface HandLandmarks {
  keypoints: Array<{
    x: number;
    y: number;
    z?: number;
    score?: number;
    name?: string;
  }>;
  handedness: 'Left' | 'Right';
  score?: number;
}

interface ASLTranslation {
  letter: string;
  confidence: number;
  timestamp: number;
}

const ASL_ALPHABET = {
  'A': [[0, 1, 1, 1, 1], [1, 1, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
  'B': [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
  'C': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 1, 1, 0]],
  'D': [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
  'E': [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 1, 1, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
  'F': [[1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 1, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
  'G': [[0, 0, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0]],
  'H': [[1, 1, 1, 1, 1], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0]],
  'I': [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
  'J': [[1, 1, 1, 1, 1], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0]],
  'K': [[1, 0, 0, 0, 0], [1, 1, 0, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 0, 1]],
  'L': [[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]],
  'M': [[1, 0, 0, 0, 1], [1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
  'N': [[1, 0, 0, 0, 1], [1, 1, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 1, 1], [1, 0, 0, 0, 1]],
  'O': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
  'P': [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
  'Q': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 1, 1], [0, 1, 1, 1, 1]],
  'R': [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0]],
  'S': [[0, 1, 1, 1, 0], [1, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
  'T': [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
  'U': [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
  'V': [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
  'W': [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 1, 0, 1, 1], [0, 1, 0, 1, 0]],
  'X': [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]],
  'Y': [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
  'Z': [[1, 1, 1, 1, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 1, 1, 1, 1]]
};

const COMMON_WORDS = {
  'HELLO': '👋',
  'THANK': '🙏',
  'YOU': '👉',
  'PLEASE': '🤲',
  'SORRY': '😔',
  'YES': '👍',
  'NO': '👎',
  'LOVE': '❤️',
  'FAMILY': '👨‍👩‍👧‍👦',
  'FRIEND': '🤝'
};

const ASLTranslator: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<ASLTranslation | null>(null);
  const [translationHistory, setTranslationHistory] = useState<ASLTranslation[]>([]);
  const [confidence, setConfidence] = useState(0.7);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [model, setModel] = useState<handPoseDetection.HandDetector | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectedHand, setDetectedHand] = useState<'Left' | 'Right' | null>(null);

  // Initialize the hand detection model
  useEffect(() => {
    const initializeModel = async () => {
      try {
        setIsLoading(true);
        const detectorConfig = {
          runtime: 'tfjs',
          modelType: 'full',
          maxHands: 2,
        };
        
        const detector = await handPoseDetection.createDetector(
          handPoseDetection.SupportedModels.MediaPipeHands,
          detectorConfig
        );
        
        setModel(detector);
        setError(null);
      } catch (err) {
        setError('Failed to initialize hand detection model. Please refresh and try again.');
        console.error('Model initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeModel();

    return () => {
      if (model) {
        model.dispose();
      }
    };
  }, []);

  // Start camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        setError(null);
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      console.error('Camera access error:', err);
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
      setIsDetecting(false);
    }
  };

  // Detect ASL signs from hand landmarks
  const detectASL = useCallback(async () => {
    if (!model || !videoRef.current || !canvasRef.current || !cameraActive) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    try {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Detect hands
      const hands = await model.estimateHands(video);

      if (hands.length > 0) {
        const hand = hands[0];
        setDetectedHand(hand.handedness);

        // Draw landmarks if enabled
        if (showLandmarks) {
          drawHandLandmarks(ctx, hand);
        }

        // Analyze hand gesture
        const detectedLetter = analyzeHandGesture(hand);
        
        if (detectedLetter && hand.score && hand.score >= confidence) {
          const translation: ASLTranslation = {
            letter: detectedLetter,
            confidence: hand.score,
            timestamp: Date.now()
          };
          
          setCurrentTranslation(translation);
          
          // Add to history if it's a new letter
          if (translationHistory.length === 0 || 
              translationHistory[translationHistory.length - 1].letter !== detectedLetter) {
            setTranslationHistory(prev => [...prev.slice(-9), translation]);
          }
        }
      } else {
        setDetectedHand(null);
        setCurrentTranslation(null);
      }
    } catch (err) {
      console.error('Detection error:', err);
    }

    // Continue detection loop
    if (isDetecting) {
      requestAnimationFrame(detectASL);
    }
  }, [model, cameraActive, isDetecting, confidence, showLandmarks, translationHistory]);

  // Draw hand landmarks on canvas
  const drawHandLandmarks = (ctx: CanvasRenderingContext2D, hand: any) => {
    const keypoints = hand.keypoints;
    
    // Draw keypoints
    keypoints.forEach((point: any, index: number) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = hand.handedness === 'Right' ? '#10b981' : '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw connections
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8], // Index finger
      [0, 9], [9, 10], [10, 11], [11, 12], // Middle finger
      [0, 13], [13, 14], [14, 15], [15, 16], // Ring finger
      [0, 17], [17, 18], [18, 19], [19, 20] // Pinky
    ];

    ctx.strokeStyle = hand.handedness === 'Right' ? '#10b981' : '#3b82f6';
    ctx.lineWidth = 2;

    connections.forEach(([start, end]) => {
      ctx.beginPath();
      ctx.moveTo(keypoints[start].x, keypoints[start].y);
      ctx.lineTo(keypoints[end].x, keypoints[end].y);
      ctx.stroke();
    });
  };

  // Analyze hand gesture to detect ASL letter
  const analyzeHandGesture = (hand: any): string | null => {
    const keypoints = hand.keypoints;
    
    // Simple gesture recognition based on finger positions
    // This is a basic implementation - a real system would use ML models
    
    const thumbTip = keypoints[4];
    const indexTip = keypoints[8];
    const middleTip = keypoints[12];
    const ringTip = keypoints[16];
    const pinkyTip = keypoints[20];
    
    const fingers = [thumbTip, indexTip, middleTip, ringTip, pinkyTip];
    
    // Check for basic ASL letters (simplified detection)
    const extendedFingers = fingers.map(finger => finger.y < keypoints[0].y - 50);
    
    // Letter A: Thumb extended, other fingers curled
    if (extendedFingers[0] && !extendedFingers[1] && !extendedFingers[2] && !extendedFingers[3] && !extendedFingers[4]) {
      return 'A';
    }
    
    // Letter B: All fingers extended
    if (extendedFingers.every(f => f)) {
      return 'B';
    }
    
    // Letter C: Curved hand shape (simplified)
    if (hand.handedness === 'Right' && keypoints[4].x < keypoints[8].x) {
      return 'C';
    }
    
    // Letter L: Thumb and index extended
    if (extendedFingers[0] && extendedFingers[1] && !extendedFingers[2] && !extendedFingers[3] && !extendedFingers[4]) {
      return 'L';
    }
    
    // Letter V: Index and middle extended (peace sign)
    if (!extendedFingers[0] && extendedFingers[1] && extendedFingers[2] && !extendedFingers[3] && !extendedFingers[4]) {
      return 'V';
    }
    
    // Letter Y: Thumb and pinky extended
    if (extendedFingers[0] && !extendedFingers[1] && !extendedFingers[2] && !extendedFingers[3] && extendedFingers[4]) {
      return 'Y';
    }
    
    return null;
  };

  // Start/stop detection
  const toggleDetection = () => {
    if (!cameraActive) {
      startCamera();
    } else {
      setIsDetecting(!isDetecting);
    }
  };

  // Run detection loop when active
  useEffect(() => {
    if (isDetecting && cameraActive) {
      detectASL();
    }
  }, [isDetecting, cameraActive, detectASL]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hand className="w-6 h-6" />
          AI ASL Translator
        </CardTitle>
        <CardDescription>
          Translate American Sign Language to text in real-time using AI-powered hand detection
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading AI model...</span>
          </div>
        )}

        {/* Camera and Canvas Container */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-64 object-cover"
            autoPlay
            muted
            playsInline
            style={{ transform: 'scaleX(-1)' }}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ transform: 'scaleX(-1)' }}
          />
          
          {!cameraActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="text-center text-white">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Camera not active</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <Button
              onClick={toggleDetection}
              variant={isDetecting ? "destructive" : "default"}
              disabled={isLoading}
              className="gap-2"
            >
              {isDetecting ? (
                <>
                  <Pause className="w-4 h-4" />
                  Stop Detection
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Detection
                </>
              )}
            </Button>
            
            <Button
              onClick={cameraActive ? stopCamera : startCamera}
              variant="outline"
              className="gap-2"
            >
              {cameraActive ? (
                <>
                  <CameraOff className="w-4 h-4" />
                  Stop Camera
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  Start Camera
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="landmarks"
                checked={showLandmarks}
                onCheckedChange={setShowLandmarks}
              />
              <label htmlFor="landmarks" className="text-sm">
                Show Landmarks
              </label>
            </div>
            
            {detectedHand && (
              <Badge variant="outline">
                {detectedHand} Hand Detected
              </Badge>
            )}
          </div>
        </div>

        {/* Confidence Slider */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Detection Confidence: {Math.round(confidence * 100)}%</label>
          <Slider
            value={[confidence]}
            onValueChange={(value) => setConfidence(value[0])}
            min={0.1}
            max={1}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Current Translation */}
        {currentTranslation && (
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Current Detection</h4>
              <Badge variant="secondary">
                {Math.round(currentTranslation.confidence * 100)}% confidence
              </Badge>
            </div>
            <div className="text-4xl font-bold text-primary">
              {currentTranslation.letter}
            </div>
          </div>
        )}

        {/* Translation History */}
        {translationHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Translation History
            </h4>
            <div className="flex flex-wrap gap-2">
              {translationHistory.map((translation, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-lg px-3 py-1"
                >
                  {translation.letter}
                  <span className="ml-1 text-xs opacity-60">
                    ({Math.round(translation.confidence * 100)}%)
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            How to Use
          </h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Position your hand in front of the camera</li>
            <li>• Form ASL letters clearly and hold steady</li>
            <li>• The AI will detect and translate your signs</li>
            <li>• Try letters: A, B, C, L, V, Y for best results</li>
            <li>• Adjust confidence threshold for better accuracy</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ASLTranslator;