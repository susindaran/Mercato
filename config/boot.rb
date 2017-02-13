ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

RAILS_ENVIRONMENT = ENV['RAILS_ENV'] ||= ENV['RACK_ENV'] ||= 'development' unless defined?(RAILS_ENVIRONMENT)

require 'bundler/setup' # Set up gems listed in the Gemfile.
