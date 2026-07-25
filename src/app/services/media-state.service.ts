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
  readonly activeVideoId = signal<string>('hackdays2026');
  readonly showQrPopup = signal<boolean>(false);

  readonly activeVideoIndex = computed(() => {
    const idx = this.videos.findIndex(v => v.id === this.activeVideoId());
    return idx !== -1 ? idx : 0;
  });

  readonly activeVideo = computed(() => 
    this.videos[this.activeVideoIndex()] || this.videos[0]
  );

  constructor() {
    this.initHashListener();
  }

  private initHashListener(): void {
    if (typeof window !== 'undefined') {
      this.checkUrlHash();
      window.addEventListener('hashchange', () => {
        this.checkUrlHash();
      });
    }
  }

  findVideo(query: string | number | null | undefined): VideoItem | undefined {
    if (query === null || query === undefined) return undefined;
    if (typeof query === 'number') {
      return this.videos[query];
    }

    const q = String(query).toLowerCase().trim();
    if (!q) return undefined;

    // Check numeric index
    if (!isNaN(Number(q))) {
      const idx = Number(q);
      if (idx >= 0 && idx < this.videos.length) {
        return this.videos[idx];
      }
    }

    // 1. Exact ID
    const exact = this.videos.find(v => v.id.toLowerCase() === q);
    if (exact) return exact;

    // 2. Substring match on ID or Title
    return this.videos.find(v => {
      const id = v.id.toLowerCase();
      const title = v.title.toLowerCase();
      return id.includes(q) || q.includes(id) || title.includes(q);
    });
  }

  private checkUrlHash(): void {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace(/^#/, '').toLowerCase();
    if (hash) {
      const video = this.findVideo(hash);
      if (video) {
        this.selectVideo(video.id, false);
      }
    }
  }

  selectVideo(indexOrQuery: number | string, updateHash: boolean = true): void {
    const video = this.findVideo(indexOrQuery);
    if (video) {
      this.activeVideoId.set(video.id);

      if (updateHash && typeof window !== 'undefined') {
        const newUrl = window.location.pathname + window.location.search + '#' + video.id;
        window.history.replaceState(null, '', newUrl);
      }
    }
  }

  onButtonClick(indexOrQuery: number | string): void {
    const video = this.findVideo(indexOrQuery);
    if (!video) return;

    if (this.activeVideoId() === video.id) {
      this.showQrPopup.set(true);
    } else {
      this.selectVideo(video.id);
    }
  }
}
