export class FirestoreError extends Error {
  constructor(code, documentRef, documentType) {
    super();
    this.name = "FirestoreError";
    // Code should be 'missing', 'exists', or 'empty'
    this.code = code;
    // The document reference returned from firestore
    this.documentRef = documentRef.path
    // An easily identifiable type for the document being accessed
    // this will be used for formatting error message and code
    // eg. circuit(s), task(s), submission(s), user(s)
    this.documentType = documentType;
  }
}
