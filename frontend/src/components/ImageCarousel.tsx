import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight, Close, ZoomIn } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import type { ArtworkImage } from '../data/types';
import { colors } from '../constants';
import { imageRadius } from '../styles';

interface ImageCarouselProps {
  images: ArtworkImage[];
  alt: string;
  // Shown beside the image on desktop (above it on phones), with the thumbnails underneath.
  title?: ReactNode;
}

const SWIPE_THRESHOLD = 60;

// Small round white buttons over the image (arrows and zoom), in the usual gallery style.
const controlSx = {
  position: 'absolute',
  zIndex: 2,
  width: { xs: 34, md: 40 },
  height: { xs: 34, md: 40 },
  bgcolor: 'rgba(255,255,255,0.92)',
  color: colors.navy,
  border: '1px solid rgba(0,0,0,0.08)',
  boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
  transition: 'opacity 0.2s ease, background-color 0.2s ease',
  '& svg': { fontSize: { xs: 20, md: 22 } },
  '&:hover': { bgcolor: colors.white },
  '&:focus-visible': { outline: `2px solid ${colors.teal}`, outlineOffset: 2 },
} as const;

const arrowSx = { ...controlSx, top: '50%', transform: 'translateY(-50%)' } as const;

// On devices with a mouse, controls only appear while hovering (or tabbing into) the image.
const revealOnHoverSx = {
  '@media (hover: hover)': {
    '& .gallery-control': { opacity: 0 },
    '&:hover .gallery-control, &:focus-within .gallery-control': { opacity: 1 },
  },
} as const;

interface StageProps {
  images: ArtworkImage[];
  alt: string;
  index: number;
  direction: number;
  go: (step: number) => void;
  height: object | string;
  onImageClick?: () => void;
}

// The sliding image area, shared by the inline carousel and the fullscreen view.
const Stage = ({ images, alt, index, direction, go, height, onImageClick }: StageProps) => {
  const multiple = images.length > 1;
  const image = images[index];

  return (
    <Box sx={{ position: 'relative', height, overflow: 'hidden', touchAction: 'pan-y' }}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={image.src}
          src={image.src}
          alt={`${alt}: ${image.caption.toLowerCase()} (${index + 1} of ${images.length})`}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 260, damping: 32 }, opacity: { duration: 0.25 } }}
          drag={multiple ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) go(1);
            else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
          }}
          onClick={onImageClick}
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            cursor: onImageClick ? 'zoom-in' : multiple ? 'grab' : 'default',
            userSelect: 'none',
          }}
        />
      </AnimatePresence>

      {multiple && (
        <>
          <IconButton className="gallery-control" aria-label="Previous image" onClick={() => go(-1)} sx={{ ...arrowSx, left: { xs: 10, md: 14 } }}>
            <ChevronLeft />
          </IconButton>
          <IconButton className="gallery-control" aria-label="Next image" onClick={() => go(1)} sx={{ ...arrowSx, right: { xs: 10, md: 14 } }}>
            <ChevronRight />
          </IconButton>
        </>
      )}
    </Box>
  );
};

const ImageCarousel = ({ images, alt, title }: ImageCarouselProps) => {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const [fullscreen, setFullscreen] = useState(false);
  const multiple = images.length > 1;

  const go = useCallback(
    (step: number) => setPage(([i]) => [(i + step + images.length) % images.length, step]),
    [images.length],
  );
  const goTo = (target: number) => setPage(([i]) => [target, target > i ? 1 : -1]);

  useEffect(() => {
    if (!multiple) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, multiple]);

  const current = images[index] ?? images[0];
  if (!current) return null;

  return (
    // Phones: title, image, thumbnails stacked. Desktop: image on the left, title and thumbnails beside it.
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '8fr 4fr' },
        gridTemplateRows: { md: 'auto 1fr' },
        gridTemplateAreas: { xs: '"title" "stage" "thumbs"', md: '"stage title" "stage thumbs"' },
        columnGap: { md: 6 },
        alignItems: 'start',
      }}
    >
      {title && <Box sx={{ gridArea: 'title', mb: { xs: 3, md: 3.5 } }}>{title}</Box>}

      <Box sx={{ gridArea: 'stage', minWidth: 0 }}>
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'rgba(14,40,65,0.06)',
          borderRadius: imageRadius,
          overflow: 'hidden',
          ...revealOnHoverSx,
        }}
      >
        <Stage
          images={images}
          alt={alt}
          index={index}
          direction={direction}
          go={go}
          height={{ xs: 'min(85vw, 60vh)', md: 'min(70vh, 600px)' }}
          onImageClick={() => setFullscreen(true)}
        />
        <IconButton
          className="gallery-control"
          aria-label="View fullscreen"
          onClick={() => setFullscreen(true)}
          sx={{ ...controlSx, top: { xs: 10, md: 14 }, right: { xs: 10, md: 14 }, '& svg': { fontSize: { xs: 18, md: 20 } } }}
        >
          <ZoomIn />
        </IconButton>
      </Box>

      </Box>

      {multiple && (
        <Box
          sx={{
            gridArea: 'thumbs',
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(4, 1fr)', sm: 'repeat(5, 1fr)', md: 'repeat(2, 1fr)' },
            gap: 1.5,
            mt: { xs: 2, md: 0 },
          }}
        >
          {images.map((img, i) => (
            <Box
              key={img.src}
              component="button"
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}: ${img.caption}`}
              aria-current={i === index}
              sx={{
                p: 0,
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: imageRadius,
                overflow: 'hidden',
                cursor: 'pointer',
                border: `3px solid ${i === index ? colors.teal : 'transparent'}`,
                opacity: i === index ? 1 : 0.65,
                transition: 'opacity 0.2s ease, border-color 0.2s ease',
                bgcolor: 'transparent',
                '&:hover': { opacity: 1 },
                '&:focus-visible': { outline: `3px solid ${colors.plum}`, outlineOffset: 2 },
              }}
            >
              <Box component="img" src={img.src} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </Box>
          ))}
        </Box>
      )}

      <Dialog
        fullScreen
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        slotProps={{ paper: { sx: { bgcolor: 'rgba(10,22,32,0.97)', color: colors.white } } }}
      >
        <IconButton
          aria-label="Close fullscreen"
          onClick={() => setFullscreen(false)}
          sx={{ position: 'absolute', top: 16, right: 16, zIndex: 3, color: colors.white, bgcolor: 'rgba(255,255,255,0.12)', '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}
        >
          <Close />
        </IconButton>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: { xs: 1, md: 4 }, py: { xs: 8, md: 6 } }}>
          <Stage images={images} alt={alt} index={index} direction={direction} go={go} height="calc(100vh - 160px)" />
          <Typography sx={{ textAlign: 'center', mt: 2, opacity: 0.85, letterSpacing: '0.04em' }}>
            {current.caption}
            {multiple && ` · ${index + 1} / ${images.length}`}
          </Typography>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ImageCarousel;
