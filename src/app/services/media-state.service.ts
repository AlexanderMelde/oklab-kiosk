import { Injectable, signal, computed } from '@angular/core';

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  externalUrl: string;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'hackdays2026',
    title: 'Hackdays 2026',
    url: 'https://www.youtube-nocookie.com/embed/jw0WmJZ2Jao?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1',
    externalUrl: 'https://www.youtube.com/watch?v=jw0WmJZ2Jao'
  },
  {
    id: 'dasfest2025',
    title: 'DAS FEST 2025',
    url: 'https://www.youtube-nocookie.com/embed/nlldj7bKl5A?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1',
    externalUrl: 'https://www.youtube.com/watch?v=nlldj7bKl5A'
  },
  {
    id: 'hackdays2024',
    title: 'Hackdays 2024',
    url: 'https://www.youtube-nocookie.com/embed/289RJwps2Sk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1',
    externalUrl: 'https://www.youtube.com/watch?v=289RJwps2Sk'
  }
];

@Injectable({
  providedIn: 'root'
})
export class MediaStateService {
  readonly videos = VIDEOS;
  readonly activeVideoIndex = signal<number>(0);
  readonly showQrPopup = signal<boolean>(false);

  readonly activeVideo = computed(() => 
    this.videos[this.activeVideoIndex()] || this.videos[0]
  );

  selectVideo(index: number): void {
    if (index >= 0 && index < this.videos.length) {
      this.activeVideoIndex.set(index);
    }
  }

  onButtonClick(index: number): void {
    if (this.activeVideoIndex() === index) {
      this.showQrPopup.set(true);
    } else {
      this.selectVideo(index);
    }
  }
}
