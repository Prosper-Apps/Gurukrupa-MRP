// Copyright (c) 2023, vishal@gurukrupaexport.in and contributors
// For license information, please see license.txt

frappe.ui.form.on('GOLD MRP PRICE', {
	onload(frm) {
		frappe.call({
			method: 'mrp.mrp.doctype.gold_mrp_price.gold_mrp_price.get_gold_price',
			callback: function(r) {
				if (!r.exc) {
					cur_frm.set_value('gold_rate',r.message[0]);
					cur_frm.set_value('rate',r.message[2]);
					cur_frm.set_value('date',r.message[3]);
					var arrayLength = r.message[1].length;
					for (var i = 0; i < arrayLength; i++) {
						console.log(r.message[1][i]);
						let row = frm.add_child('details', {
							carat:r.message[1][i][0],
							gold_purity:r.message[1][i][1],
							dollor:r.message[1][i][2],
							rupee:r.message[1][i][3],
						});
					}
					frm.refresh_field('details');
				}
			}
		});
		var parent_fields = [["metal_touch","Metal Touch"]];
        set_item_attribute_filters_on_fields_in_parent_doctype(frm, parent_fields);
	}
});

function set_item_attribute_filters_on_fields_in_parent_doctype(frm, fields) {
  fields.map(function(field){
    frm.set_query(field[0], function() {
      return {
        query: 'jewellery_erpnext.query.item_attribute_query',
        filters: {'item_attribute': field[1]}
      }
    })
  })
}