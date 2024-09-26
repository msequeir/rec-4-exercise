import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { BadValuesError, NotFoundError } from "./errors";

export interface LabelDoc extends BaseDoc {
  // TODO 4: what state is stored for each label of the Labeling concept?
  creator: ObjectId;
  name: string;
  items: Array<ObjectId>;
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
    const _id = await this.labels.createOne({ creator, name, items: [] });
    return { msg: "Label successfully created!", label: await this.labels.readOne({ _id }) };
  }

  async getByCreator(creator: ObjectId) {
    // TODO 6: finding labels
    // const labels = assert.fail("Not implemented!");
    const labels = await this.labels.readMany({ creator });
    return { msg: "Here are your labels!", labels };
  }

  async affix(label: ObjectId, item: ObjectId) {
    // TODO 7: labeling an item
    const labeldoc = await this.labels.readOne({ _id: label });

    // Checks if label exists
    if (labeldoc === null) {
      throw new NotFoundError("No label exists");
    }

    // Checks if an item already has that label
    if (labeldoc?.items.some((id) => id.equals(item))) {
      throw new BadValuesError("Item has label already");
    }

    await this.labels.partialUpdateOne({ _id: label }, { items: labeldoc.items.concat(item) });
    return { msg: "Success!" };
  }

  async assertCreatorIsUser(_id: ObjectId, user: ObjectId) {
    // TODO not in recitation today :)
    //  - see Posting.assertAuthorIsUser
    //  - consider how to keep things both DRY and modular
  }
}
