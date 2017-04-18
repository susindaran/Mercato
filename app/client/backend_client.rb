require_relative 'client_helper'
require_relative 'http_client'

class BackendClient

  CLIENT_NAME = self.name

  def self.headers
    ClientHelper.common_headers
  end

  def self.create_customer(payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer"
    HttpClient.post(url, payload, headers)
  end

  def self.login(payload, is_admin)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/login?admin=#{is_admin}"
    HttpClient.post(url, payload, headers)
  end

  def self.update_customer(payload, customer_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/update/#{customer_id}"
    HttpClient.post(url, payload, headers)
  end

  def self.get_customer(customer_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/#{customer_id}"
    HttpClient.get(url, headers)
  end

  def self.delete_address(address_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/address/#{address_id}"
    HttpClient.delete(url, headers)
  end

  def self.delete_card_detail(card_number)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/card/#{card_number}"
    HttpClient.delete(url, headers)
  end

  def self.get_all_states
    url = "#{ClientHelper.url(CLIENT_NAME)}/tax_details/state/all"
    HttpClient.get(url, headers)
  end

  def self.get_tax_details_of_state(state)
    url = "#{ClientHelper.url(CLIENT_NAME)}/tax_details/state/#{state}"
    HttpClient.get(url, headers)
  end

  def self.add_address(customer_id, payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/address/#{customer_id}"
    HttpClient.post(url, payload, headers)
  end

  def self.add_card_details(customer_id, payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/customer/card/#{customer_id}"
    HttpClient.post(url, payload, headers)
  end

  def self.get_product(product_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/product/#{product_id}"
    HttpClient.get(url, headers)
  end

  def self.get_products_paginated(page, size)
    url = "#{ClientHelper.url(CLIENT_NAME)}/product?page=#{page}&size=#{size}"
    HttpClient.get(url, headers)
  end

  def self.get_product_count
    url = "#{ClientHelper.url(CLIENT_NAME)}/product/count"
    HttpClient.get(url, headers)
  end

  def self.delete_product(product_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/product/#{product_id}"
    HttpClient.delete(url, headers)
  end

  def self.add_product(data)
    url = "#{ClientHelper.url(CLIENT_NAME)}/product/"
    HttpClient.post url, data, headers
  end

  def self.update_product(data, product_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/product/#{product_id}"
    HttpClient.put(url, data, headers)
  end

  def self.get_all_categories
    url = "#{ClientHelper.url(CLIENT_NAME)}/category/all"
    HttpClient.get url,headers
  end
  def self.get_all_products(page,size, category)
      url = "#{ClientHelper.url(CLIENT_NAME)}/product/?page=#{page}&size=#{size}&category_id=#{category}"
      HttpClient.get(url,headers)
    end

  def self.get_all_shipments(page, size, type)
    url = "#{ClientHelper.url(CLIENT_NAME)}/shipment/#{type}?page=#{page}&size=#{size}"
    HttpClient.get(url, headers)
  end

  def self.update_shipment_status(data)
    url = "#{ClientHelper.url(CLIENT_NAME)}/shipment/status"
    HttpClient.put url, data, headers
  end

  def self.get_all_order_details(page, size, type)
    url = "#{ClientHelper.url(CLIENT_NAME)}/order_detail/#{type}?page=#{page}&size=#{size}"
    HttpClient.get(url, headers)
  end

  def self.update_order_detail_status(data)
    url = "#{ClientHelper.url(CLIENT_NAME)}/order_detail/status"
    HttpClient.put url, data, headers
  end

  def self.get_cart_count(customer_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/cart/#{customer_id}?only_count=true"
    HttpClient.get(url, headers)
  end

  def self.get_cart_items(customer_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/cart/#{customer_id}"
    HttpClient.get(url, headers)
  end

   def self.add_product_to_cart(payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/cart/"
    HttpClient.post(url, payload, headers)
  end

  def self.delete_cart_item(cart_id)
    url = "#{ClientHelper.url(CLIENT_NAME)}/cart/#{cart_id}"
    HttpClient.delete(url, headers)
  end

  def self.update_cart_item(cart_id, body)
    url = "#{ClientHelper.url(CLIENT_NAME)}/cart/#{cart_id}"
    HttpClient.put url, body, headers
  end

  def self.get_orders(customer_id, page, size)
    url = "#{ClientHelper.url(CLIENT_NAME)}/order/customer/#{customer_id}?page=#{page}&size=#{size}"
    HttpClient.get(url, headers)
  end

  def self.place_order(customer_id, payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/order/#{customer_id}"
    HttpClient.post(url, payload, headers)
  end

  def self.make_payment(order_id, payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/payment/#{order_id}"
    HttpClient.post(url, payload, headers)
  end

  def self.create_subscription(payload)
    url = "#{ClientHelper.url(CLIENT_NAME)}/subscription"
    HttpClient.post(url, payload, headers)
  end

  def self.get_subscriptions(customer_id)
    url="#{ClientHelper.url(CLIENT_NAME)}/subscription/customer/#{customer_id}"
    HttpClient.get(url, headers)
  end

  def self.delete_subscription(subscription_id)
      url = "#{ClientHelper.url(CLIENT_NAME)}/subscription/#{subscription_id}"
      HttpClient.delete(url, headers)
    end
end
