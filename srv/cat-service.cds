using hc450.officesupplies  as db from '../db/schema' ;

service CatalogService{
    @odata.draft.enabled : true
    entity Products as projection on db.Products;
    entity Suppliers as projection on db.Suppliers;

    function get_supplier_info() returns array of Suppliers;
}