def full_render(page)
	text = erb page
	erb :appWrap, :locals => {:body => text }	
end

get '/' do
	full_render(:index)
end

get '/:page' do |page|
	full_render(page.to_sym)
end

options '/' do
	erb :index
end

options '/:page' do |page|
	erb page.to_sym
end

__END__

@@appWrap
<html>
	<head>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
		<script src="blitz.js"></script>

	</head>
	<body>
		<%= body %>
	</body>
</html>
