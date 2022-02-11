from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify
from io import BytesIO
from PIL import Image
from django.core.files import File

class Categories(models.TextChoices):
    WORLD = 'world'
    ENVIRONMENT = 'environment'
    TECHNOLOGY = 'technology'
    DESIGN = 'design'
    CULTURE = 'culture'
    BUSINESS ='business'
    POLITICS = 'politics'
    SCIENCE = 'science'
    HEALTH = 'health'
    TRAVEL = 'travel'
     
    

class BlogPost(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    category = models.CharField(max_length=20,choices=Categories.choices, default=Categories.WORLD)
    image= models.ImageField(upload_to='photos/%Y/%m/%d', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True, null=True)
    excerpt = models.CharField(max_length=150)
    month = models.CharField(max_length=3)
    day = models.CharField(max_length=2)
    content = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default = datetime.now, blank=True)
    
    
    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = BlogPost.objects.all().filter(slug__iexact=original_slug).count()
        count =1
        slug=original_slug
        
        while(queryset):
            slug=original_slug+ '-' + str(count)
            count += 1
            queryset = BlogPost.objects.all().filter(slug__iexact=slug).count()
            
        self.slug = slug
        if self.featured:
            try:
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except BlogPost.DoesNotExist:
                pass
            
        super(BlogPost, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.title  
    
    def get_absolute_url(self):
        return f'/{self.slug}/'
    
    def get_image(self):
        if self.image:
            return 'http://127.0.0.1:8000' + self.image.url
        return ''
    
    def get_thumbnail(self):
        if self.thumbnail:
            return 'http://127.0.0.1:8000' + self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()
                return 'http://127.0.0.1:8000' + self.thumbnail.url
            else:
                return ''
            
    def make_thumbnail(self, image, size=(300, 200)):
        img = Image.open(image)
        # img.convert('RBG')
        img.thumbnail(size)
        
        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=85)
        
        thumbnail = File(thumb_io,name=image.name)
        return thumbnail
        
