import { valueOfId } from './utils'

class DocumentRefCounter {
  constructor (observer) {
    this.heap = {}
    this.observer = observer
  }

  increment (collectionName, docId) {
    const key = `${collectionName}:${valueOfId(docId)}`
    if (!this.heap[key]) {
      this.heap[key] = 0
    }
    this.heap[key] += 1
  }

  decrement (collectionName, docId) {
    const key = `${collectionName}:${valueOfId(docId)}`
    if (this.heap[key]) {
      this.heap[key] -= 1

      this.observer.onChange(collectionName, docId, this.heap[key])

      // Clean up heap entry when ref count reaches 0 to prevent memory leak
      if (this.heap[key] <= 0) {
        delete this.heap[key]
      }
    }
  }
}

export default DocumentRefCounter
