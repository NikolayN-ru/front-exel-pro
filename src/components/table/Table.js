import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "@/components/table/table.template";
import { $ } from "@core/dom";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ["mousedown"],
      // listeners: ["mousedown", "click", 'mousemove', 'mouseup'],
    });
  }

  toHTML() {
    return createTable(20);
  }

  // onClick(event) {
  //   // console.log("click", event);
  // }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest("[data-type='resizable']");
      const coords = $parent.getCoords();
      const type = $resizer.data.resize;

      if (type !== "row") {
        document.onmousemove = (e) => {
          const delta = e.pageX - coords.right;
          $parent.$el.style.width = coords.width + delta + "px";
          document
            .querySelectorAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => {
              el.style.width = coords.width + delta + "px";
            });
        };
      } else {
        document.onmousemove = (e) => {
          const delta = e.pageY - coords.bottom;
          $parent.$el.style.height = coords.height + delta + "px";
        };
      }

      document.onmouseup = (e) => {
        document.onmousemove = null;
      };
    }
  }

  // onMousemove(){
  //   console.log("mouseMove");
  // }

  // onMouseup(){
  //   console.log("mouseUp");
  // }
}
