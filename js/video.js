const LAG_TOLERANCE = 0.01666666666; // 1 Frame at 60fps
const MAX_BUFFER_LENGTH = 20; // Seconds
const BUFFER_REMOVAL_CUSHION = 4; // Seconds
const _FTYP = [0x66, 0x74, 0x79, 0x70];

export class VideoPlayer {
  constructor(element) {
    this.element = element;
    this.videoSource = this.mediaSource = this._lastSegment = this._initSegment = null;
    this.initialized = false;
    this._stalledPlayerCounter = { time: 0, value: 0 }
    this.queue = [];
  }

  _submit() {
    if (this.element.buffered.length && this.element.currentTime > this.element.buffered.end(0)) {
      console.log('WENT PAST BUFFER');
      console.log('CURRENT STATE: ', this.element.readyState);
    }

    if (!this.initialized || this.videoSource.updating) return;

    // if (this.element.currentTime !== 0 &&
    //   (this._stalledPlayerCounter.value === 0 || this._stalledPlayerCounter.time === this.element.currentTime)) {
    //   this._stalledPlayerCounter.time = this.element.currentTime;
    //   this._stalledPlayerCounter.value++;
    //   if (this._stalledPlayerCounter.value > 3) {
    //     this._stalledPlayerCounter = { time: 0, value: 0 };
    //     this._reinit(this._initSegment);
    //     return;
    //   }
    // } else this._stalledPlayerCounter = { time: 0, value: 0 };

    // if (this._lastSegment) {
    //   this._appendBuffer(this._lastSegment);
    //   delete this._lastSegment;
    //   return;
    // }

    // if (this.element.buffered.length) {
    //   const currentTime = this.element.currentTime;
    //   const bufferStart = this.element.buffered.start(0);
    //   const bufferEnd = this.element.buffered.end(0);
    //   if (currentTime - bufferStart > MAX_BUFFER_LENGTH && currentTime < bufferEnd) {
    //     this.videoSource.remove(bufferStart, currentTime - BUFFER_REMOVAL_CUSHION);
    //   }
    // }

    if (this.queue.length) {
      this._appendBuffer(this.queue.shift());
    }
  }

  _appendBuffer(frame) {
    try {
      if (this.initialized && !this.element.error)
        this.videoSource.appendBuffer(frame);
    } catch (error) {
      console.error(error.message);
      // this.destroy(); // Disable for debugging
    }
  }

  _init(initSegment) {
    this._initSegment = initSegment;
    this.mediaSource = new MediaSource();
    this.mediaSource.addEventListener('sourceopen', () => {
      console.log('source open');
      this.videoSource = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42C020,opus"');
      //this.videoSource.mode = 'sequence';
      this._submit = this._submit.bind(this);
      this.videoSource.addEventListener('update', this._submit, { capture: true, passive: true, once: false });
      this.videoSource.appendBuffer(this._initSegment);
      this.element.play();
      this.initialized = true;
      
      this.element.addEventListener('error', () => {
        console.error(this.element.error.message);
        this._reinit(this._initSegment);
      }, { capture: true, passive: true, once: true });
    }, { capture: true, passive: true, once: true });

    this.element.src = URL.createObjectURL(this.mediaSource);

    window.reinit = () => {
      this._reinit(this._initSegment);
    };
  }

  destroy() {
    this.initialized = false;

    if (this.element) {
      this.element.pause();
      URL.revokeObjectURL(this.element.src);
      this.element.load();
    }

    if (this.mediaSource) {
      if (this.mediaSource.readyState === 'open') this.mediaSource.endOfStream();
      if (this.mediaSource.sourceBuffers && this.mediaSource.sourceBuffers.length) {
        this.mediaSource.removeSourceBuffer(this.videoSource);
      }
      delete this.mediaSource;
    }

    if (this.videoSource) {
      this.videoSource.removeEventListener('update', this._submit, { capture: true, passive: true, once: false });
      if (this.videoSource.updating) {
        this.videoSource.abort();
      }
      delete this.videoSource;
    }
  }

  _reinit(initSegment) {
    console.log('Reinit called');
    this.destroy();
    this._init(initSegment);
  }

  _isInitSegment(frame) {
    return frame[4] === _FTYP[0] &&
      frame[5] === _FTYP[1] &&
      frame[6] === _FTYP[2] &&
      frame[7] === _FTYP[3];
  }

  push(data) {
    const frame = new Uint8Array(data);

    if (!this._initSegment && this._isInitSegment(frame)) {
      console.log('Got init segment');
      this._reinit(frame);
      return;
    }
    if (!this.initialized) return;
    // if (this.videoSource.buffered.length) {
    //   const currentTime = this.element.currentTime;
    //   const bufferEnd = this.element.buffered.end(0);
    //   if (currentTime < bufferEnd - (LAG_TOLERANCE * 120))
    //     this.element.currentTime = bufferEnd - (LAG_TOLERANCE * 120);
    // }
    // if (this.videoSource.updating) this._lastSegment = frame;
    // else {
    //   delete this._lastSegment;
    //   this._appendBuffer(frame);
    // }

    this.queue.push(frame);
    this._submit();
  }
}