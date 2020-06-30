<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<router-link class="navbar-brand" to="/">Home</router-link>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item">
                    <router-link class="nav-link" to="/events">Events</router-link>
				</li>
			</ul>
			<div class="my-2 my-lg-0">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<router-link class="nav-link" to="/registration">Registration</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/authorization">Authorization</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>