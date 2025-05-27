
import React, { useState, useEffect } from 'react';
import { BootPhase } from '../types';
import ProgressBar from './ProgressBar';

interface BootScreenProps {
  onBootComplete: () => void;
}

const bootMessages: Record<BootPhase, string[]> = {
  [BootPhase.STARTING]: ["System BIOS shadowing...", "Initializing PnP BIOS extensions..."],
  [BootPhase.HARDWARE_INIT]: [
    "Detecting CPU @ 3.0GHz...",
    "Memory Test: 65536K OK",
    "Detecting Primary Master: HDD Model XYZ...",
    "Detecting Primary Slave: CD-ROM Drive...",
    "Initializing USB Controllers...",
  ],
  [BootPhase.OS_LOADING]: [
    "Loading Y2K Portfolio OS...",
    "Verifying DMI Pool Data........",
    "Starting Windows...",
  ],
  [BootPhase.DESKTOP_START]: ["Preparing desktop environment..."],
  [BootPhase.DONE]: ["Boot sequence complete."],
};

// Explicitly define the phases that will have their messages typed out.
const PHASES_FOR_TYPING: BootPhase[] = [
  BootPhase.STARTING,
  BootPhase.HARDWARE_INIT,
  BootPhase.OS_LOADING,
  BootPhase.DESKTOP_START,
];

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [currentPhase, setCurrentPhase] = useState<BootPhase>(BootPhase.STARTING);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate startup sound
    console.log("Playing startup jingle (simulated)");

    let phaseTypingLoopIndex = 0; // Index for iterating through PHASES_FOR_TYPING

    const processPhaseLogic = () => {
      if (phaseTypingLoopIndex >= PHASES_FOR_TYPING.length) {
        // All message-typing phases are complete
        setProgress(100); // Ensure progress bar is full
        setCurrentPhase(BootPhase.DONE); // Set final phase state
        setTimeout(() => {
          onBootComplete(); // Call boot complete callback
        }, 1000); // Brief pause before fading out or transitioning
        return;
      }

      const phaseToProcess = PHASES_FOR_TYPING[phaseTypingLoopIndex];
      setCurrentPhase(phaseToProcess); // Update current phase state for UI

      const messagesForThisPhase = bootMessages[phaseToProcess];

      if (!messagesForThisPhase) {
        console.error(`BootScreen: No messages found for phase ${BootPhase[phaseToProcess]} (numeric: ${phaseToProcess}). Skipping phase.`);
        phaseTypingLoopIndex++;
        setTimeout(processPhaseLogic, 50); // Try next phase quickly
        return;
      }

      let messageDisplayIndex = 0;
      const totalProgressContributingPhases = PHASES_FOR_TYPING.length;

      const typeMessageForCurrentPhase = () => {
        if (messageDisplayIndex < messagesForThisPhase.length) {
          setDisplayedText((prev) => [...prev, messagesForThisPhase[messageDisplayIndex]]);
          messageDisplayIndex++;

          // Original progress logic: each of the PHASES_FOR_TYPING contributes equally.
          // Its share of progress is then divided among its messages.
          if (messagesForThisPhase.length > 0 && totalProgressContributingPhases > 0) {
            const progressIncrement = 100 / (totalProgressContributingPhases * messagesForThisPhase.length);
            setProgress(prev => Math.min(100, prev + progressIncrement));
          }
          
          setTimeout(typeMessageForCurrentPhase, Math.random() * 200 + 100); // Simulate typing delay
        } else {
          // All messages for the current phase are typed
          phaseTypingLoopIndex++;
          setTimeout(processPhaseLogic, 500); // Delay before processing the next phase
        }
      };
      
      if (messagesForThisPhase.length === 0) {
        // If a phase has no messages, move to the next one.
        // Progress for this phase's slot will be skipped by current logic, which is fine.
        // Or, one could add `100 / totalProgressContributingPhases` to progress here.
        console.warn(`BootScreen: Phase ${BootPhase[phaseToProcess]} has no messages. Moving to next phase.`);
        phaseTypingLoopIndex++;
        setTimeout(processPhaseLogic, 50); 
      } else {
        typeMessageForCurrentPhase();
      }
    };

    processPhaseLogic(); // Start the boot sequence processing

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBootComplete]); // Dependencies: onBootComplete is stable. bootMessages and BootPhase are module constants.

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-green-400 font-mono p-8">
      <div className="w-full max-w-2xl space-y-2 text-sm">
        <p className="text-2xl text-center mb-4 text-white">Y2K Portfolio OS - Booting Up</p>
        {displayedText.map((text, index) => (
          <p key={index} className="whitespace-pre-wrap">{`> ${text}`}</p>
        ))}
        {/* Display the "Boot sequence complete" message when currentPhase is DONE */}
        {currentPhase === BootPhase.DONE && bootMessages[BootPhase.DONE] && bootMessages[BootPhase.DONE][0] && (
          <p className="text-yellow-400 mt-4">{`> ${bootMessages[BootPhase.DONE][0]}`}</p>
        )}
      </div>
      <div className="w-full max-w-2xl mt-8">
        <ProgressBar progress={progress} />
        <p className="text-center text-xs mt-2 text-gray-400">Loading System Resources...</p>
      </div>
      <pre className="text-sm text-blue-400 mt-6">
{`
  _  __  ___  _  _   ___   __  __ ___ ___ _  _ ___ 
 | |/ / |__ /| \\| | | __| |  \\/  | _ \\ __| \\| / __|
 | ' <   |_ \\| . \` | | _|  | |\\/| |  _/ _|| . \` \\__ \\
 |_|\\_\\ |___/|_|\\_| |___| |_|  |_|_| |___|_|\\_|___/
                                                  
`}
      </pre>
    </div>
  );
};

export default BootScreen;
