interface GiftState {
  videoBlob: Blob | null;
  videoUrl: string;
  fromName: string;
  toName: string;
  date: string;
  message: string;
}

export const useGiftStore = defineStore("gift", {
  state: (): GiftState => ({
    videoBlob: null,
    videoUrl: "",
    fromName: "",
    toName: "",
    date: "",
    message: "",
  }),
  actions: {
    setVideo(blob: Blob | null, url: string) {
      this.videoBlob = blob;
      this.videoUrl = url;
    },
    setMessages(
      fromName: string,
      toName: string,
      date: string,
      message: string
    ) {
      this.fromName = fromName;
      this.toName = toName;
      this.date = date;
      this.message = message;
    },
    resetStore() {
      this.videoBlob = null;
      this.fromName = "";
      this.toName = "";
      this.date = "";
      this.message = "";
    },
  },
});
