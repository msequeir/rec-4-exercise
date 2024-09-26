import { strict as assert } from "assert";

import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError, NotFoundError } from "./errors";

export interface LabelDoc extends BaseDoc {
  // TODO 4: what state is stored for each label of the Labeling concept?
}

/**
 * concept: Labeling [Creator, Item]
 */
export default class LabelingConcept {
  public readonly labels: DocCollection<LabelDoc>;

  /**
   * Make an instance of Labeling.
   */
  constructor(collectionName: string) {
    this.labels = new DocCollection<LabelDoc>(collectionName);
  }

  async create(creator: ObjectId, name: string) {
    // TODO 5: creating a label
    const _id = assert.fail("Not implemented!");
    return { msg: "Label successfully created!", label: await this.labels.readOne({ _id }) };
  }

  async getByCreator(creator: ObjectId) {
    // TODO 6: finding labels
    const labels = assert.fail("Not implemented!");
    return { msg: "Here are your labels!", labels };
  }

  async affix(label: ObjectId, item: ObjectId) {
    // TODO 7: labeling an item
    throw new Error("Not implemented!");
  }

  async assertCreatorIsUser(_id: ObjectId, user: ObjectId) {
    // TODO not in recitation today :)
    //  - see Posting.assertAuthorIsUser
    //  - consider how to keep things both DRY and modular
  }
}
