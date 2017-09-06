
desc "This task is called by the Heroku scheduler add-on"
task :update_searches => :environment do
  puts "Updating feed..."
  SearchResult.update
  puts "done."
end
