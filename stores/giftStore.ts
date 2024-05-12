interface GiftState {
  documentId: string;
  videoBlob: Blob | null;
  videoUrl: string;
  title: string;
  fromName: string;
  toName: string;
  message: string;
}

export const useGiftStore = defineStore("gift", {
  state: (): GiftState => ({
    documentId: "",
    videoBlob: null,
    videoUrl: "",
    title: "",
    fromName: "",
    toName: "",
    message: "",
  }),
  actions: {
    setDocumentId(id: string) {
      this.documentId = id;
    },
    setVideo(blob: Blob | null, url: string) {
      this.videoBlob = blob;
      this.videoUrl = url;
    },
    setMessages(
      title: string,
      fromName: string,
      toName: string,
      message: string
    ) {
      this.title = title;
      this.fromName = fromName;
      this.toName = toName;
      this.message = message;
    },
    resetStore() {
      this.documentId = "";
      this.videoBlob = null;
      this.title = "";
      this.fromName = "";
      this.toName = "";
      this.message = "";
    },
  },
});
