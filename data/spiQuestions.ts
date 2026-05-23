
export interface SPIQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const spiQuestions: SPIQuestion[] = [
  {
    id: 'spi_01',
    category: 'Physics Principles',
    question: 'What happens to the period of a wave if the frequency is doubled?',
    options: [
      'It doubles',
      'It is halved',
      'It quadruples',
      'It remains unchanged'
    ],
    correctAnswer: 1,
    explanation: 'Frequency and period are inversely related (f = 1/T). If frequency doubles, the period must be halved.'
  },
  {
    id: 'spi_02',
    category: 'Transducers',
    question: 'Which of the following is the most common piezoelectric material used in ultrasound transducers?',
    options: [
      'Quartz',
      'Tourmaline',
      'Lead Zirconate Titanate (PZT)',
      'Barium Titanate'
    ],
    correctAnswer: 2,
    explanation: 'Lead Zirconate Titanate (PZT) is the most common synthetic piezoelectric material used in modern ultrasound transducers.'
  },
  {
    id: 'spi_03',
    category: 'Doppler',
    question: 'What is the Doppler shift if the transmitted frequency is 5 MHz and the received frequency is 5.002 MHz?',
    options: [
      '2 kHz',
      '5 kHz',
      '0.002 MHz',
      'Both A and C'
    ],
    correctAnswer: 3,
    explanation: 'The Doppler shift is the difference between the received and transmitted frequencies. 5.002 MHz - 5 MHz = 0.002 MHz, which is equal to 2 kHz.'
  },
  {
    id: 'spi_04',
    category: 'Artifacts',
    question: 'Which artifact is caused by the sound beam bouncing between two strong reflectors?',
    options: [
      'Shadowing',
      'Enhancement',
      'Reverberation',
      'Mirror Image'
    ],
    correctAnswer: 2,
    explanation: 'Reverberation occurs when sound bounces back and forth between two strong reflectors, creating multiple equally spaced echoes.'
  },
  {
    id: 'spi_05',
    category: 'Safety',
    question: 'Which index is most relevant when considering the potential for bioeffects due to cavitation?',
    options: [
      'Thermal Index (TI)',
      'Mechanical Index (MI)',
      'Spatial Peak Temporal Average (SPTA)',
      'Duty Factor'
    ],
    correctAnswer: 1,
    explanation: 'The Mechanical Index (MI) is related to the likelihood of cavitation (bubble formation) in the tissues.'
  },
  {
    id: 'spi_06',
    category: 'Resolution',
    question: 'Axial resolution is primarily determined by:',
    options: [
      'Beam width',
      'Spatial pulse length',
      'Transducer diameter',
      'Focusing'
    ],
    correctAnswer: 1,
    explanation: 'Axial resolution = SPL / 2. Therefore, it is determined by the spatial pulse length.'
  },
  {
    id: 'spi_07',
    category: 'Hemodynamics',
    question: 'According to Poiseuille\'s equation, if the radius of a vessel is doubled, the flow rate increases by a factor of:',
    options: [
      '2',
      '4',
      '8',
      '16'
    ],
    correctAnswer: 3,
    explanation: 'Flow rate is proportional to the radius to the fourth power (r^4). 2^4 = 16.'
  },
  {
    id: 'spi_08',
    category: 'Instrumentation',
    question: 'Which component of the ultrasound system is responsible for adjusting the signal to compensate for attenuation?',
    options: [
      'Pulser',
      'Receiver (TGC)',
      'Scan Converter',
      'Display'
    ],
    correctAnswer: 1,
    explanation: 'Time Gain Compensation (TGC) in the receiver compensates for the effects of attenuation as sound travels deeper into the body.'
  },
  {
    id: 'spi_09',
    category: 'Waves',
    question: 'Sound is a __________, __________ wave.',
    options: [
      'Transverse, Electromagnetic',
      'Longitudinal, Mechanical',
      'Transverse, Mechanical',
      'Longitudinal, Electromagnetic'
    ],
    correctAnswer: 1,
    explanation: 'Sound is a mechanical wave (requires a medium) and a longitudinal wave (particles move parallel to the direction of wave travel).'
  },
  {
    id: 'spi_10',
    category: 'Transducers',
    question: 'The thickness of the matching layer is typically:',
    options: [
      '1/2 wavelength',
      '1/4 wavelength',
      '1 wavelength',
      '2 wavelengths'
    ],
    correctAnswer: 1,
    explanation: 'The matching layer is designed to be 1/4 of the wavelength thick to minimize reflections at the transducer-skin interface.'
  },
  {
    id: 'spi_11',
    category: 'Doppler',
    question: 'Aliasing occurs when the Doppler shift exceeds:',
    options: [
      'The Pulse Repetition Frequency (PRF)',
      'Half the PRF (Nyquist Limit)',
      'Twice the PRF',
      'The operating frequency'
    ],
    correctAnswer: 1,
    explanation: 'Aliasing occurs when the Doppler shift frequency exceeds the Nyquist limit, which is PRF / 2.'
  },
  {
    id: 'spi_12',
    category: 'Artifacts',
    question: 'A "comet tail" artifact is a form of:',
    options: [
      'Shadowing',
      'Enhancement',
      'Reverberation',
      'Refraction'
    ],
    correctAnswer: 2,
    explanation: 'Comet tail artifact is a type of reverberation artifact caused by very closely spaced reflectors.'
  },
  {
    id: 'spi_13',
    category: 'Safety',
    question: 'The ALARA principle stands for:',
    options: [
      'As Low As Reasonably Achievable',
      'Always Low And Right Always',
      'As Long As Reasonably Allowed',
      'A Low Acoustic Radiation Area'
    ],
    correctAnswer: 0,
    explanation: 'ALARA (As Low As Reasonably Achievable) is the fundamental principle of ultrasound safety, emphasizing the use of minimum power and time necessary.'
  },
  {
    id: 'spi_14',
    category: 'Resolution',
    question: 'Lateral resolution is equal to:',
    options: [
      'SPL / 2',
      'Beam diameter',
      'Wavelength / 2',
      'Pulse duration'
    ],
    correctAnswer: 1,
    explanation: 'Lateral resolution is determined by the width or diameter of the sound beam.'
  },
  {
    id: 'spi_15',
    category: 'Hemodynamics',
    question: 'The Reynold\'s number predicts the onset of:',
    options: [
      'Laminar flow',
      'Turbulent flow',
      'Plug flow',
      'Parabolic flow'
    ],
    correctAnswer: 1,
    explanation: 'The Reynold\'s number is used to predict whether blood flow will be laminar or turbulent. A value over 2000 typically indicates turbulence.'
  },
  {
    id: 'spi_16',
    category: 'Instrumentation',
    question: 'Which process converts the negative voltages of a signal into positive voltages?',
    options: [
      'Smoothing',
      'Rectification',
      'Compression',
      'Rejection'
    ],
    correctAnswer: 1,
    explanation: 'Rectification is the first step of demodulation, converting all negative voltages into positive ones.'
  },
  {
    id: 'spi_17',
    category: 'Waves',
    question: 'The propagation speed of sound in soft tissue is approximately:',
    options: [
      '330 m/s',
      '1450 m/s',
      '1540 m/s',
      '3500 m/s'
    ],
    correctAnswer: 2,
    explanation: 'The average propagation speed of sound in human soft tissue is 1,540 m/s (or 1.54 mm/µs).'
  },
  {
    id: 'spi_18',
    category: 'Transducers',
    question: 'Focusing improves __________ resolution.',
    options: [
      'Axial',
      'Lateral',
      'Temporal',
      'Contrast'
    ],
    correctAnswer: 1,
    explanation: 'Focusing narrows the beam width in the focal zone, thereby improving lateral resolution.'
  },
  {
    id: 'spi_19',
    category: 'Doppler',
    question: 'The Doppler equation states that the Doppler shift is directly proportional to:',
    options: [
      'Velocity of the reflector',
      'Cosine of the Doppler angle',
      'Transmitted frequency',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'The Doppler shift (Δf) = (2 * f * v * cosθ) / c. It is proportional to frequency, velocity, and the cosine of the angle.'
  },
  {
    id: 'spi_20',
    category: 'Artifacts',
    question: 'An anechoic structure with bright echoes posterior to it is an example of:',
    options: [
      'Shadowing',
      'Enhancement',
      'Edge shadowing',
      'Ghost image'
    ],
    correctAnswer: 1,
    explanation: 'Enhancement occurs when sound travels through a low-attenuating structure (like a cyst), resulting in brighter echoes behind it.'
  },
  {
    id: 'spi_21',
    category: 'Safety',
    question: 'Which intensity is most commonly used to describe the risk of thermal bioeffects?',
    options: [
      'SPTP',
      'SATA',
      'SPTA',
      'SATp'
    ],
    correctAnswer: 2,
    explanation: 'SPTA (Spatial Peak Temporal Average) is the intensity most closely correlated with tissue heating.'
  },
  {
    id: 'spi_22',
    category: 'Resolution',
    question: 'Temporal resolution is improved by:',
    options: [
      'Increasing frame rate',
      'Increasing line density',
      'Using multiple focal zones',
      'Increasing imaging depth'
    ],
    correctAnswer: 0,
    explanation: 'Temporal resolution is determined by frame rate. Higher frame rates lead to better temporal resolution.'
  },
  {
    id: 'spi_23',
    category: 'Hemodynamics',
    question: 'The Bernoulli principle describes the relationship between:',
    options: [
      'Pressure and flow',
      'Velocity and pressure',
      'Resistance and viscosity',
      'Radius and flow'
    ],
    correctAnswer: 1,
    explanation: 'The Bernoulli principle states that as the velocity of a fluid increases, the pressure exerted by the fluid decreases.'
  },
  {
    id: 'spi_24',
    category: 'Instrumentation',
    question: 'A 6-bit memory system can display how many shades of gray?',
    options: [
      '6',
      '12',
      '32',
      '64'
    ],
    correctAnswer: 3,
    explanation: 'The number of shades of gray is 2^n, where n is the number of bits. 2^6 = 64.'
  },
  {
    id: 'spi_25',
    category: 'Waves',
    question: 'If the power of a beam is tripled, the intensity is:',
    options: [
      'Tripled',
      'Halved',
      'Increased by 9 times',
      'Unchanged'
    ],
    correctAnswer: 0,
    explanation: 'Intensity is directly proportional to power (I = P/A). If power triples, intensity triples.'
  },
  {
    id: 'spi_26',
    category: 'Transducers',
    question: 'The range of frequencies contained within an ultrasound pulse is called:',
    options: [
      'Quality factor',
      'Bandwidth',
      'Duty factor',
      'Resonant frequency'
    ],
    correctAnswer: 1,
    explanation: 'Bandwidth is the range of frequencies between the highest and lowest frequencies in a pulse.'
  },
  {
    id: 'spi_27',
    category: 'Doppler',
    question: 'To eliminate aliasing, one should:',
    options: [
      'Increase the PRF',
      'Decrease the Doppler angle',
      'Use a higher frequency transducer',
      'Increase the imaging depth'
    ],
    correctAnswer: 0,
    explanation: 'Increasing the PRF (scale) raises the Nyquist limit, which can help eliminate aliasing.'
  },
  {
    id: 'spi_28',
    category: 'Artifacts',
    question: 'Which artifact results in the lateral displacement of a reflector?',
    options: [
      'Refraction',
      'Mirror image',
      'Side lobes',
      'Speed error'
    ],
    correctAnswer: 0,
    explanation: 'Refraction can cause a reflector to appear laterally displaced from its true position.'
  },
  {
    id: 'spi_29',
    category: 'Safety',
    question: 'The Mechanical Index is inversely proportional to the square root of:',
    options: [
      'Power',
      'Frequency',
      'Intensity',
      'Depth'
    ],
    correctAnswer: 1,
    explanation: 'MI = Peak Rarefactional Pressure / √f. It is inversely proportional to the square root of the frequency.'
  },
  {
    id: 'spi_30',
    category: 'Instrumentation',
    question: 'Which receiver function reduces the dynamic range of the signal?',
    options: [
      'Amplification',
      'Compensation',
      'Compression',
      'Demodulation'
    ],
    correctAnswer: 2,
    explanation: 'Compression reduces the range between the largest and smallest signals to a level the system can handle.'
  },
  {
    id: 'spi_31',
    category: 'Physics Principles',
    question: 'The unit for impedance is:',
    options: [
      'Watt',
      'Pascal',
      'Rayls',
      'Decibel'
    ],
    correctAnswer: 2,
    explanation: 'Impedance is measured in Rayls (Z).'
  },
  {
    id: 'spi_32',
    category: 'Transducers',
    question: 'Damping material in a transducer pulse does what to the bandwidth?',
    options: [
      'Decreases it',
      'Increases it',
      'Has no effect',
      'Halves it'
    ],
    correctAnswer: 1,
    explanation: 'Damping material creates shorter pulses, which results in a broader bandwidth and a lower quality factor.'
  },
  {
    id: 'spi_33',
    category: 'Doppler',
    question: 'The mathematical process used to analyze spectral Doppler signals is:',
    options: [
      'Autocorrelation',
      'Fast Fourier Transform (FFT)',
      'Demodulation',
      'Phase shifting'
    ],
    correctAnswer: 1,
    explanation: 'FFT is used for spectral Doppler (PW and CW) to process the returning frequencies.'
  },
  {
    id: 'spi_34',
    category: 'Artifacts',
    question: 'Which artifact is characterized by a "stepladder" or "venetian blind" appearance?',
    options: [
      'Comet tail',
      'Reverberation',
      'Mirror image',
      'Slice thickness'
    ],
    correctAnswer: 1,
    explanation: 'Reverberation appears as multiple, equally spaced echoes along a straight line.'
  },
  {
    id: 'spi_35',
    category: 'Safety',
    question: 'According to AIUM, no confirmed bioeffects have been reported for intensities below _____ mW/cm² (unfocused).',
    options: [
      '1',
      '10',
      '100',
      '1000'
    ],
    correctAnswer: 2,
    explanation: 'AIUM states that for unfocused ultrasound, there are no confirmed bioeffects below 100 mW/cm² SPTA.'
  },
  {
    id: 'spi_36',
    category: 'Resolution',
    question: 'Which type of resolution is usually the best in ultrasound?',
    options: [
      'Axial',
      'Lateral',
      'Elevational',
      'Contrast'
    ],
    correctAnswer: 0,
    explanation: 'Axial resolution is typically superior because pulses are usually shorter than they are wide.'
  },
  {
    id: 'spi_37',
    category: 'Hemodynamics',
    question: 'Hydrostatic pressure is zero at the level of the ________ in a standing patient.',
    options: [
      'Head',
      'Heart',
      'Ankle',
      'Knee'
    ],
    correctAnswer: 1,
    explanation: 'Hydrostatic pressure is referenced to the level of the heart, where it is zero.'
  },
  {
    id: 'spi_38',
    category: 'Instrumentation',
    question: 'What is the purpose of the reject (threshold) function?',
    options: [
      'To increase power',
      'To eliminate low-level noise',
      'To compress the signal',
      'To change the focal depth'
    ],
    correctAnswer: 1,
    explanation: 'Rejection/Threshold removes low-amplitude echoes that are likely noise, cleaning up the image.'
  },
  {
    id: 'spi_39',
    category: 'Waves',
    question: 'If the amplitude of a wave is doubled, the power is:',
    options: [
      'Doubled',
      'Tripled',
      'Quadrupled',
      'Halved'
    ],
    correctAnswer: 2,
    explanation: 'Power is proportional to amplitude squared (P ∝ A²). 2² = 4.'
  },
  {
    id: 'spi_40',
    category: 'Transducers',
    question: 'The resonant frequency of a pulsed wave transducer is determined by the propagation speed of the PZT and:',
    options: [
      'The thickness of PZT',
      'The diameter of PZT',
      'The backing material',
      'The matching layer'
    ],
    correctAnswer: 0,
    explanation: 'Frequency for pulsed wave = Propagation speed of PZT / (2 * thickness of PZT).'
  },
  {
    id: 'spi_41',
    category: 'Doppler',
    question: 'Which Doppler technique uses autocorrelation?',
    options: [
      'Pulsed Wave Doppler',
      'Continuous Wave Doppler',
      'Color Doppler',
      'Power Doppler'
    ],
    correctAnswer: 2,
    explanation: 'Color Doppler uses autocorrelation because it is faster than FFT, though less accurate for exact velocities.'
  },
  {
    id: 'spi_42',
    category: 'Artifacts',
    question: 'Shadowing artifact results from:',
    options: [
      'Low attenuation',
      'High attenuation',
      'Refraction',
      'Reverberation'
    ],
    correctAnswer: 1,
    explanation: 'Shadowing is caused by a highly attenuating structure that absorbs or reflects most of the sound, leaving a dark path behind it.'
  },
  {
    id: 'spi_43',
    category: 'Safety',
    question: 'Thermal Bioeffects are most related to which intensity?',
    options: [
      'SPTA',
      'SPTP',
      'SATA',
      'I_m'
    ],
    correctAnswer: 0,
    explanation: 'SPTA (Spatial Peak Temporal Average) is the intensity most closely linked to tissue heating.'
  },
  {
    id: 'spi_44',
    category: 'Resolution',
    question: 'Lateral resolution is equal to the:',
    options: [
      'SPL / 2',
      'Wavelength',
      'Beam diameter',
      'Pulse duration'
    ],
    correctAnswer: 2,
    explanation: 'Lateral resolution is primarily determined by the width or diameter of the sound beam.'
  },
  {
    id: 'spi_45',
    category: 'Basics',
    question: 'How many milliseconds are in 2 seconds?',
    options: [
      '20',
      '200',
      '2,000',
      '20,000'
    ],
    correctAnswer: 2,
    explanation: '1 second = 1,000 milliseconds. Therefore 2 seconds = 2,000 ms.'
  },
  {
    id: 'spi_46',
    category: 'Instrumentation',
    question: 'Increasing the output power results in:',
    options: [
      'Increased signal-to-noise ratio',
      'Decreased signal-to-noise ratio',
      'No change in SNR',
      'Increased attenuation'
    ],
    correctAnswer: 0,
    explanation: 'Increasing output power increases the signal strength more than the noise, improving the Signal-to-Noise Ratio (SNR).'
  },
  {
    id: 'spi_47',
    category: 'Doppler',
    question: 'The spectral window is filled in when ________ occurs.',
    options: [
      'Laminar flow',
      'Spectral broadening',
      'Plug flow',
      'Parabolic flow'
    ],
    correctAnswer: 1,
    explanation: 'Spectral broadening, often caused by turbulence or a large sample volume, fills in the spectral window.'
  },
  {
    id: 'spi_48',
    category: 'Artifacts',
    question: 'Which artifact is caused by the sound beam having nonzero width?',
    options: [
      'Reverberation',
      'Slice thickness',
      'Refraction',
      'Shadowing'
    ],
    correctAnswer: 1,
    explanation: 'Slice thickness (or elevational resolution) artifact occurs because the beam has a thickness that can overlap and average multiple structures.'
  },
  {
    id: 'spi_49',
    category: 'Safety',
    question: 'Which of the following would minimize the Thermal Index (TI)?',
    options: [
      'Decrease output power',
      'Increase imaging depth',
      'Decrease focus depth',
      'Increase PRF'
    ],
    correctAnswer: 0,
    explanation: 'Decreasing output power directly reduces the energy delivered to the tissue, lowering the TI.'
  },
  {
    id: 'spi_50',
    category: 'Resolution',
    question: 'The frame rate is NOT affected by:',
    options: [
      'Imaging depth',
      'Line density',
      'Number of focal zones',
      'Output power'
    ],
    correctAnswer: 3,
    explanation: 'Output power affects image brightness but does not change the time required to acquire a frame.'
  },
  {
    id: 'spi_51',
    category: 'Hemodynamics',
    question: 'Venous pressure in the lower extremities ______ when a patient inhales.',
    options: [
      'Increases',
      'Decreases',
      'Remains the same',
      'Becomes zero'
    ],
    correctAnswer: 0,
    explanation: 'Inspiration increases intra-abdominal pressure, which impedes venous return from the legs, increasing distal venous pressure.'
  },
  {
    id: 'spi_52',
    category: 'Instrumentation',
    question: 'The range of intensities displayed in an image is the:',
    options: [
      'Frequency',
      'Bandwidth',
      'Dynamic range',
      'Duty factor'
    ],
    correctAnswer: 2,
    explanation: 'Dynamic range is the ratio or range between the largest and smallest signals accurately processed by the system.'
  },
  {
    id: 'spi_53',
    category: 'Transducers',
    question: 'The Curie point is the temperature at which:',
    options: [
      'PZT is manufactured',
      'PZT loses its piezoelectric properties',
      'PZT begins to vibrate',
      'PZT is sterilized'
    ],
    correctAnswer: 1,
    explanation: 'Depolarization occurs if the piezoelectric material is heated above the Curie point temperature.'
  },
  {
    id: 'spi_54',
    category: 'Doppler',
    question: 'Power Doppler is most useful for detecting:',
    options: [
      'High velocity flow',
      'Direction of flow',
      'Turbulent flow',
      'Low velocity flow'
    ],
    correctAnswer: 3,
    explanation: 'Power Doppler is highly sensitive and can detect very slow flows, though it loses directional information.'
  },
  {
    id: 'spi_55',
    category: 'Artifacts',
    question: 'Posterior enhancement is seen behind:',
    options: [
      'Calcifications',
      'Gallstones',
      'Fluid-filled structures',
      'Highly attenuating masses'
    ],
    correctAnswer: 2,
    explanation: 'Enhancement occurs behind structures with very low attenuation, such as cysts, bladder, or gallbladder.'
  },
  {
    id: 'spi_56',
    category: 'Waves',
    question: 'Sound travels fastest in:',
    options: [
      'Air',
      'Water',
      'Soft tissue',
      'Bone'
    ],
    correctAnswer: 3,
    explanation: 'Propagation speed is fastest in solids (stiff media) like bone and slowest in gases like air.'
  },
  {
    id: 'spi_57',
    category: 'Instrumentation',
    question: 'What receiver function is NOT adjustable by the operator?',
    options: [
      'Amplification',
      'Compensation',
      'Demodulation',
      'Compression'
    ],
    correctAnswer: 2,
    explanation: 'Demodulation (rectification and smoothing) is a fixed process built into the receiver and cannot be adjusted by the user.'
  },
  {
    id: 'spi_58',
    category: 'Resolution',
    question: 'Contrast resolution is improved by using:',
    options: [
      'Fewer gray shades',
      'More bits per pixel',
      'A smaller transducer',
      'Higher frame rate'
    ],
    correctAnswer: 1,
    explanation: 'More bits per pixel allow for a greater number of gray shades, which improves contrast resolution.'
  },
  {
    id: 'spi_59',
    category: 'Artifacts',
    question: 'The mirror image artifact is always located ________ to the true reflector.',
    options: [
      'Anterior',
      'Lateral',
      'Deeper',
      'Shallower'
    ],
    correctAnswer: 2,
    explanation: 'Mirror image artifacts always appear deeper than the true structure, on the other side of a strong specular reflector.'
  },
  {
    id: 'spi_60',
    category: 'Basics',
    question: 'What is the reciprocal of 100?',
    options: [
      '0.1',
      '0.01',
      '0.001',
      '1,000'
    ],
    correctAnswer: 1,
    explanation: 'The reciprocal is 1/x. 1/100 = 0.01.'
  }
];
