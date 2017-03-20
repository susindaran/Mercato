class Product
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  def persisted?
    false
  end
  attr_accessor :product_id, :category_prefix, :product_name, :product_description, :quantity, :price

   def initialize(hsh = {})
     hsh.each do |key, value|
       public_send :"#{key}=", value
     end
   end
end