import { render } from "@redwoodjs/testing/web";

import FamilyMemberMenu from "./FamilyMemberMenu";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("FamilyMemberMenu", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<FamilyMemberMenu />);
    }).not.toThrow();
  });
});
