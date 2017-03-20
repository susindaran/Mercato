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
end
